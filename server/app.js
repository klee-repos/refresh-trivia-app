
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Promise = require('bluebird');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
require('dotenv').config();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var SessionManager = require('./SessionManager');
SessionManager.initialize(io);

var Intents = require('./Intents');
var ExecuteRequest = require('./RequestHandlers');

var VoiceManager = require('./voiceManager');
var voiceManager = new VoiceManager(io);

var Connect = require('./Intents/Connect');
var currentGame;

// Sounds
const correctURL = "https://storage.googleapis.com/trivia-df1da.appspot.com/sounds/correct-chime.wav";
const wrongURL = "https://storage.googleapis.com/trivia-df1da.appspot.com/sounds/wrong.mp3";

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


app.post('/gAssistant', function(req, res) {
	ExecuteRequest.FromGoogle(req.body, res);
})

// var mainMenuRoutes = require('./MainMenu/api');
// app.use('/mainMenu', mainMenuRoutes);

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});