
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
		data: {"google":{"is_ssml":true}},
		contextOut: [],
		source: "",
		followupEvent: {}
	}
}


const Game = require('./components/Game');
const game = new Game();

var GameState = require('./models/GameState');

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
						result.contextOut = [{"name":"game", "lifespan":5, "parameters":{"gameStateId":state.gameStateId, "questionIndex":i}}]; 
						// result.speech = question;
						result.speech = "<speak><say-as interpret-as=\"cardinal\">12345</say-as></speak>"
						res.send(result);
						
					})
				}
				break;
			}
		})	
	} 
	
	else if (intent === 'guess') {
		var guess = req.body.result.parameters.guess;
		let contexts = req.body.result.contexts;
		let gameContext;
		for (let i = 0; i < contexts.length; i++) {
			if (contexts[i].name === 'game') {
				gameContext = contexts[i]
				break;
			}
		}
		if (!gameContext) {
			console.log('Error: Missing game context')
			return;
		}
		let gStateId = gameContext.parameters.gameStateId
		let questionIndex = gameContext.parameters.questionIndex
		// console.log(req.body.result.contexts)

		GameState.findOne({gameStateId:gStateId}, function(err, gameState) {
			if (gameState) {
				let theQuestion = gameState.questions[parseInt(questionIndex)];
				let newAnswers = theQuestion.answersGiven.slice();
				let answerKey = theQuestion.answerKey.slice();
				let answerIndex;
				game.isAnAnswer(guess, theQuestion.answersFull).then(function(answer) {
					if (answer) {
						for (let i = 0; i < answerKey.length; i++) {
							if (answerKey[i] === answer.key) {
								answerIndex = i;
								break;
							}
						}
						newAnswers[answerIndex] = answer.key
						gameState.questions[parseInt(questionIndex)].answersGiven = newAnswers;
						gameState.markModified('questions');
						gameState.save();
						result.speech = answer.key + " is correct!"
						game.formatAnswers(newAnswers).then(function(preparedAnswers) {
							sessionManager.io.emit('correctAnswer', preparedAnswers)
						})
					} else {
						result.speech = "Not correct!"
					}
					result.contextOut = [{"name":"game", "lifespan":5, "parameters":{"gameStateId":gStateId, "questionIndex":questionIndex}}]; 
					res.send(result);
				})
			} else {
				result.speech = "There was a problem. Please try your guess again."
				res.send(result);
			}
		})		
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