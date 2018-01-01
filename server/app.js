
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Promise = require('bluebird');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
require('dotenv').config();

var guid = require('uuid/v4')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var Intents = require('./Intents');

var SessionManager = require('./sessionManager');
var sessionManager = new SessionManager(io);

var VoiceManager = require('./voiceManager');
var voiceManager = new VoiceManager(io);

var Connect = require('./Intents/Connect');
var quizes = require('./Quizes')
var currentGame;


// Connection to MongoDB Altas via mongoose
mongoose.Promise = Promise;
var db_uri = process.env.DB_URI;

mongoose.connect(db_uri, {useMongoClient: true}, (err) => {if (err) console.log("Mongoose error: " + err)});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var User = require('./models/User');

var dialogflowResponse = function(){
	return {
		speech: "",
		displayText: "",
		data: {},
		contextOut: [],
		source: "",
		followupEvent: {}
	}
}


const Game = require('./components/Game');
const game = new Game();

app.post('/gAssistant', function(req, res) {

	var intent = req.body.result.action;
    var result = dialogflowResponse();

	var gId = req.body.originalRequest.data.user.userId;  // Unique identifier for Google
	if(!gId) {return res.status(400).send()}
		
	if (intent === 'input.welcome') {
		User.findOne({gAssistantId:gId}, function(err, user) {
			if (!user) {
				result.speech = "What session would you like to connect to?"
			} else {
				result.speech = "Welcome"
			}
			res.send(result);
		})
	} 
	
	else if (intent === 'connect' ) {
		var connectCode = req.body.result.parameters.connectCode;
		result.speech = "connected";
		Intents.Connect(res, result, gId, connectCode, sessionManager);
	} 
	
	else if (intent ==='startGame') {
		let quizEntity = req.body.result.parameters.game;
		let question;
		game.createGame(quizEntity, gId).then(function(state) {
			for (let i = 0; i < state.totalQuestions; i++) {
				if (state.questions[i].state === 'new') {
					question = state.questions[i].question;
					var answersGiven = state.questions[i].answersGiven;
					game.formatAnswers(answersGiven).then(function(preparedAnswers) {
						sessionManager.io.emit('startGame', quizEntity, question, preparedAnswers);
						result.contextOut = [{"name":"game", "lifespan":5, "parameters":{"gameStateId":state.gameStateId}}]; 
						result.speech = question;
						res.send(result);
						
					})
				}
				break;
			}
		})	
	} 
	
	else if (intent === 'guess') {
		var guess = req.body.result.parameters.guess;
		// var gameStateId = req.body.result.parameters.gameStateId;
		console.log(req.body.result.contexts)
		console.log(req.body.result.contexts[0])
		// var quiz = quizes[currentGame];
		// var answers = quiz.questions[0].answers;
		// var answer = game.isAnAnswer(guess,answers,gameStateId);
		// if (answer) {
		// 	sessionManager.io.emit('correctAnswer', answer.key)
		// 	result.speech = answer.key + " is correct!"
		// } else {
		// 	result.speech = "Not correct!"
		// }
		// result.contextOut = [{"name":"game", "lifespan":3, "parameters":{'turns':5}}]; 
		result.speech="test"
		res.send(result);
	}
})

var mainMenuRoutes = require('./MainMenu/api');
app.use('/mainMenu', mainMenuRoutes);

// app.post('/voice', function(req,res) {
// 	var voice = req.body.voice;
// 	var sessionCode = req.body.sessionCode;
// 	var uniqueUserId = req.body.userId;	
// 	voiceManager.runDF(voice).then(function(result) {
// 		var intentName =  result.result.metadata.intentName
// 		if (intentName === 'Connect') {
// 			Connect(result, uniqueUserId, sessionManager)
// 		}
// 	})
// })

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});