var User = require('./models/User');
var guid = require('uuid/v4');

var SessionManager = (function(){
    var io;
    var connectingSessions = {};

    var initialize = function(_io){
        io = _io;
        io.on('connection',function(socket){
            console.log("Connected")
            socket.on('startSession',function(requestedCode){
                if (requestedCode){
                    socket.join(requestedCode);
                    socket.emit('sessionCode', requestedCode);
                    User.findOne({sessionCode:requestedCode}, function(err, user) {
                        if(user) {
                            console.log(user.context.name)
                            socket.emit('setStatus', user.context.name)
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
    }

    var getConnectCode = function(){
        return new Promise(function(resolve,reject){
            resolve(Math.floor(Math.random() * (10000 - 1000)) + 1000); //The maximum is exclusive and the minimum is inclusive
          })
    }

    var getSession = function(connectCode){
        return connectingSessions[connectCode];
    }

    var endSession = function(connectCode){
        delete connectingSessions[connectCode];
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

    var sendData = function(room,event,data){
        io.to(room).emit(event,data);
    }

    return {
        getConnectCode: getConnectCode,
        getSession: getSession,
        endSession: endSession,
        getConnectCode: findFreeConnectCode,
        initialize: initialize,
        sendData: sendData
    }
})()

module.exports = SessionManager;