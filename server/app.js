
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
				result.speech = "Welcome to Trivia. What session would you like to connect to?"
			} else {
				result.speech = "Welcome to Trivia."
			}
			res.send(result);
		})
	} 
	
	else if (intent === 'connect' ) {
		var connectCode = req.body.result.parameters.connectCode;
		result.speech = "ok";
		Intents.Connect(res, result, gId, connectCode, sessionManager);
		sessionManager.io.emit("openApp", "mainMenu");
	} 
	
	else if (intent ==='startGame') {
		var game = req.body.result.parameters.game;
		result.contextOut = [{"name":"game", "lifespan":2, "parameters":{'turns':5}}]; 
		result.speech = quizes[game].questions[0].text;
		currentGame = game;
		res.send(result);
	} 
	
	else if (intent === 'guess') {
        var result = dialogflowResponse();
        var guess = req.body.result.parameters.guess;
		var quiz = quizes[currentGame];
		var answers = quiz.questions[0].answers;
        var answer = isAnAnswer(guess,answers);
		result.speech = answer ? answer.key : "Not an answer";
		res.send(result);
	}
})

app.get ('/games', function(req, res) {
	res.send(quizes)
})

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