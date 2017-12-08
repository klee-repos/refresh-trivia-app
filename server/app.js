
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var Promise = require('bluebird');
var mongoose = require('mongoose');
var io = require('socket.io')(server);
var SessionManager = require('./sessionManager');
var sessionManager = new SessionManager(io);

var guid = require('uuid/v4')
require('dotenv').config();

require('./apps/gdax/Gdax.js')(io);
require('./apps/iex/IEX.js')(io);
require('./apps/hackerNews/HackerNews.js')(io);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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


app.post('/connect', function(req, res) {
	var amzId = req.body.amzUserId;
	if(!amzId) {return res.status(400).send()}
	var connectCode = req.body.connectCode;
	User.findOne({amzUserId:amzId}, function(err, user) {
		if (!user) {
			var user = new User();
			user.amzUserId = amzId;
			user.sessionCode = User.generateSessionCode();
			user.save();
		}
		if(sessionManager.getSession(connectCode)){
			console.log('here')
			io.to(sessionManager.getSession(connectCode)).emit('re-connect', user.sessionCode);
			sessionManager.removeSession(connectCode);
		}
		res.status(200).send(user.sessionCode);
	});
});

var blackjackRoutes = require('./apps/blackjack/api'); //We should consolidate app routes. 
var weatherRoutes = require('./apps/weather/api');
var iexRoutes = require('./apps/iex/api');
var gdaxRoutes = require('./apps/gdax/api');

//TODO: Really only Alexa -> app routes
app.use('/apps', function(req,res,next){  
	req.sessionCode = req.get('sessionCode');
	req.io = io.to(req.sessionCode);
	next();
});

app.use('/apps/blackjack/', blackjackRoutes);
app.use('/apps/weather', weatherRoutes);
app.use('/apps/iex/', iexRoutes);
app.use('/apps/gdax/', gdaxRoutes);

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});