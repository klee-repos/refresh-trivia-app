
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

var isAnAnswer = function(guess,answers){
    var answer = null;
    guess = guess.toLowerCase();
    answers.some(function(ans){
        if(ans.key.toLowerCase() === guess){
            answer = ans;
            return true;
        }
        if(ans.phrasings.some(function(phr){
            if(phr.toLowerCase() === guess){
                answer = ans;
            }
        }));
    });
    return answer;
}

const Game = require('./components/Game');
const game = new Game();

app.post('/gAssistant', function(req, res) {
	console.log(req.body)
	console.log("userId: " + req.body.originalRequest.data.user.userId)

	var intent = req.body.result.action;
    var result = dialogflowResponse();

	var gId = req.body.originalRequest.data.user.userId;
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
					var answers = state.questions[i].answers;
					game.formatAnswers(answers).then(function(answerKey) {
						sessionManager.io.emit('startGame', quizEntity, question, answerKey);
						result.contextOut = [{"name":"game", "lifespan":3, "parameters":{'turns':5}}]; 
						result.speech = question;
						res.send(result);
					})
					break;
				}
			}
		})	
	} 
	
	else if (intent === 'guess') {
        var result = dialogflowResponse();
        var guess = req.body.result.parameters.guess;
		var quiz = quizes[currentGame];
		var answers = quiz.questions[0].answers;
		var answer = isAnAnswer(guess,answers);
		if (answer) {
			sessionManager.io.emit('correctAnswer', answer.key)
			result.speech = answer.key + " is a correct guess!"
		} else {
			result.speech = "Not a correct guess!"
		}
		result.contextOut = [{"name":"game", "lifespan":3, "parameters":{'turns':5}}]; 
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