var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('dotenv').config();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Session = require('./models/Session');


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



var blackjackGamesBySession = {};

var findUniqueSessionCode = function(){
	return new Promise(function(resolve,reject){
		var sessionCode = Session.generateName().then(function(sessionCode){
			if(!blackjackGamesBySession[sessionCode])
				resolve(sessionCode);				
			else
				findUniqueSessionCode();
		});
	});
}

io.on('connection',function(socket){
	socket.on('startSession',function(){
		findUniqueSessionCode().then(function(sessionCode){
			blackjackGamesBySession[sessionCode] = new Blackjack();
			socket.join(sessionCode);
			socket.emit('sessionCode', sessionCode);
			socket.on('disconnect',function(){
				delete blackjackGamesBySession[sessionCode];
			});
		});
	})
});

var blackjackRoutes = require('./apps/blackjack/api'); //We should consolidate app routes. 
app.use('/blackjack/', blackjackRoutes);

app.post('/connect', function(req, res) {
	var sessionCode = req.body.sessionCode;
	if(blackjackGamesBySession[sessionCode])
		res.send({"found":true})
	else
		res.send({"found":false});
});


app.get('/test/:name', function(req,res){
    res.send({user:req.params.name})
});


server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started")
});

