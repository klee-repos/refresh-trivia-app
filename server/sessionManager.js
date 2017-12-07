var User = require('./models/User');
var connectingSessions = {};
var guid = require('uuid/v4')

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

var sessionManager = function(io){
    io.on('connection',function(socket){
        
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
}
module.exports = sessionManager;