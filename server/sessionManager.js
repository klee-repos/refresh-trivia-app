var User = require('./models/User');
var connectingSessions = {};
var guid = require('uuid/v4')

// You can find your project ID in your Dialogflow agent settings
const projectId = 'my-weather-55a85'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define Dialogflow session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

var getConnectCode = function(){
	return new Promise(function(resolve,reject){
		resolve(Math.floor(Math.random() * (10000 - 1000)) + 1000); //The maximum is exclusive and the minimum is inclusive
	  })
}

var findFreeConnectCode = function(){
	return new Promise(function(resolve,reject){
		var connectCode = getConnectCode().then(function(connectCode){
			if(!connectingSessions[connectCode])
				resolve(connectCode);				
			else
				findFreeConnectCode();
		});
	});
}

var runDF = function(data) {
  
}

var sessionManager = function(io){
    io.on('connection',function(socket){

        socket.on('final_transcript', function(final_transcript) {
            runDF(final_transcript)
        });
        
        socket.on('gdax-subscribe', function(active){
            socket.join('gdax-updates');
        });

        socket.on('gdax-unsubscribe', function(active){
            socket.leave('gdax-updates')
        });

        socket.on('iex-subscribe', function(active){
            socket.join('iex-updates');
        });
        socket.on('time-subscribe', function(active){
            socket.join('time-updates');
        });

        socket.on('startSession',function(requestedCode){
            if (requestedCode){
                socket.join(requestedCode);
                socket.emit('sessionCode', requestedCode);
                User.findOne({sessionCode:requestedCode}, function(err, user) {
                    if(user) {
                        for (var key in user.preferences) {
                            socket.emit(key, user.preferences[key]);
                        }
                    }
                })
            } else {
                findFreeConnectCode().then(function(connectCode){
                    var socketName = guid();
                    connectingSessions[connectCode] = socketName;
                    socket.join(socketName);
                    socket.emit('connectCode', connectCode);
                });
            }
        })
    });

    this.getSession = function(connectCode){
        return connectingSessions[connectCode];
    }

    this.removeSession = function(connectCode){
        delete connectingSessions[connectCode];
    }

    this.runDF = function(data) {
        var requestDF = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: data,
                    languageCode: languageCode,
                },
            },
        }
        sessionClient
        .detectIntent(requestDF)
        .then(function(responses) {
            const result = responses[0].queryResult;
            // console.log(result.parameters.fields.quantity.numberValue)
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            console.log(`  Parameters: ${result.parameters.fields.quantity}`);
            if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
            } else {
            console.log(`  No intent matched.`);
            }
        })
        .catch(function(err) {
            console.error('ERROR:', err);
        })
    }



}
module.exports = sessionManager;