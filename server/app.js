
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Promise = require('bluebird');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var sessionManager = {};

var guid = require('uuid/v4')
require('dotenv').config();

require('./apps/gdax/Gdax.js')(io);
require('./apps/iex/IEX.js')(io);
require('./apps/timeDate/TimeDate.js')(io);
require('./apps/hackerNews/HackerNews.js')(io);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Connection to MongoDB Altas via mongoose
var mongoose = require("mongoose");
mongoose.Promise = Promise;
var db_uri = process.env.DB_URI;

mongoose.connect(db_uri, {useMongoClient: true}, function(err) {
	if (err) {
		console.log("Mongoose error: " + err);
	} else {
		console.log("successfully connected to db");
	}
});

if (process.env.NODE_ENV === 'production') {

    // Express will serve up production assets
    app.use(express.static('client/build'));

    // Express will serve up index.html file if it doesn't recognize route
    // app.get('*', (req,res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    // });
}

// Add headers
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var User = require('./models/User');

var appsBySession = {};

var getConnectCode = function(){
	return new Promise(function(resolve,reject){
		resolve(Math.floor(Math.random() * (10000 - 1000)) + 1000); //The maximum is exclusive and the minimum is inclusive
	  })
}

var findFreeConnectCode = function(){
	return new Promise(function(resolve,reject){
		var sessionCode = getConnectCode().then(function(sessionCode){
			if(!appsBySession[sessionCode])
				resolve(sessionCode);				
			else
				findFreeConnectCode();
		});
	});
}

io.on('connection',function(socket){
	
	socket.on('gdax-subscribe', function(active){
		socket.join('gdax-updates');
		console.log('gdax server subscribed')		
	});

	socket.on('gdax-unsubscribe', function(active){
		socket.leave('gdax-updates', function(err) {
			if (err) {
				console.log(err)
			}
		});		
	});

	socket.on('iex-subscribe', function(active){
		socket.join('iex-updates');
	});
	socket.on('time-subscribe', function(active){
		socket.join('time-updates');
	});


	socket.on('startSession',function(requestedCode){
		if (requestedCode){
			User.findOne({sessionCode:requestedCode}, function(err, user) {
				if(user) {
					socket.emit("userPrefs", user.preferences);
				}
			})
			socket.join(requestedCode);
			socket.emit('sessionCode', requestedCode);
		} else {
			findFreeConnectCode().then(function(connectCode){
				var socketName = guid();
				sessionManager[connectCode] = socketName;
				socket.join(socketName);
				socket.emit('sessionCode', socketName);
				socket.emit('connectCode', connectCode);
			});
		}
	})
});

app.post('/connect', function(req, res) {
	var amzId = req.body.amzUserId;
	var sessionCode;
	var connectCode = req.body.connectCode;
	User.findOne({amzUserId:amzId}, function(err, user) {
		if (!user) {
			var user = new User();
			user.amzUserId = amzId;
			user.sessionCode = User.generateSessionCode();
			user.save();
		}
		if(sessionManager[connectCode]){
			io.to(sessionManager[connectCode]).emit('sessionCode', user.sessionCode);
			delete sessionManager[connectCode];
		}
		res.status(200).send(user.sessionCode);
	});
});

var blackjackRoutes = require('./apps/blackjack/api'); //We should consolidate app routes. 
var weatherRoutes = require('./apps/weather/api');
var iexRoutes = require('./apps/iex/api');

//TODO: Really only Alexa -> app routes
app.use('/apps', function(req,res,next){  
	req.sessionCode = req.get('sessionCode');
	console.log(req.sessionCode);
	req.io = io.to(req.sessionCode);
	next();
});

app.use('/apps/blackjack/', blackjackRoutes);
app.use('/apps/weather', weatherRoutes);
app.use('/apps/iex/', iexRoutes);

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});