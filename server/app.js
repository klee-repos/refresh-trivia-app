var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('dotenv').config();

require('./apps/gdax/Gdax.js')(io);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Connection to MongoDB Altas via mongoose
var mongoose = require("mongoose");
var db_uri = process.env.DB_URI;
// var Session = require("./models/AlexaSession");

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

var Session = require('./models/Session');

var appsBySession = {};

var findUniqueSessionCode = function(){
	return new Promise(function(resolve,reject){
		var sessionCode = Session.generateName().then(function(sessionCode){
			if(!appsBySession[sessionCode])
				resolve(sessionCode);				
			else
				findUniqueSessionCode();
		});
	});
}

const iexSocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/last')


	

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

	iexSocket.on('message', function(data) {
		console.log(data);
	});
	
	iexSocket.on('connect', () => {	
		// Subscribe to topics (i.e. appl,fb,aig+)
		console.log('iex')
		iexSocket.emit('subscribe', 'snap')
	})

	

	socket.on('startSession',function(requestedCode){
		if(requestedCode){
			socket.join(requestedCode);
			socket.emit('sessionCode', requestedCode);	
		}else{
			findUniqueSessionCode().then(function(sessionCode){
				socket.join(sessionCode);
				socket.emit('sessionCode', sessionCode);
				var newSession = Session({
					_id: sessionCode,
					sessionCode: sessionCode,
					amzUserId: null
				})
				newSession.save(function(err) {
					if (err) {
						console.log(err)
					} else {
						console.log('session created in db');
					};
				})
			});
		}
	})

});



// Need refactoring

app.post('/connect', function(req, res) {
	var amzId = req.body.amzUserId;
	var sessionCode = parseInt(req.body.sessionCode);
	var status;

	Session.findById(sessionCode, function(err, resSession) {
		if (resSession.amzUserId) {
			status = 'existing';
		} else {
			status ='created';
			resSession.amzUserId = amzId;
			resSession.save(function(err) {
				if (err) {
					console.log(err)
				} else {
					console.log('amzUserId saved to a session');
				};
			})
			
		}
	}).then(function() {
		res.send({"status":status})
	})
});

var blackjackRoutes = require('./apps/blackjack/api'); //We should consolidate app routes. 
var iexRoutes = require('./apps/iex/api');


//TODO: Really only app routes
app.use('/apps', function(req,res,next){  
	req.sessionCode = req.body.sessionCode;
	req.io = io.to(req.sessionCode);
	next();
}) 

//Twenty One
app.use('/apps/blackjack/', blackjackRoutes);

// IEX Stock Exchange
app.use('/apps/iex/', iexRoutes);

app.get('/test/:name', function(req,res){
    res.send({user:req.params.name})
});

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});

