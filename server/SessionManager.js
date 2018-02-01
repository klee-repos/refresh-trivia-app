var User = require('./models/User');
var guid = require('uuid/v4');
var PurpleMonkeyDishwasher = require('purple-monkey-dishwasher');

var SessionManager = (function(){
    var io;
    var connectingSessions = {};

    var initialize = function(_io){
        io = _io;
        io.on('connection',function(socket){
            socket.on('startSession',function(requestedCode){
                if (requestedCode){
                    socket.join(requestedCode);
                    socket.emit('sessionCode', requestedCode);
                    User.findOne({sessionCode:requestedCode}, function(err, user) {
                        if(user) {
                            socket.emit('setStatus', user.context)
                            for (var key in user.preferences) {
                                socket.emit(key, user.preferences[key]);
                            }
                        } else {
                            socket.emit('disconnectSession', requestedCode);
                            findFreeConnectCode().then(function(connectCode){
                                var socketName = guid();
                                connectingSessions[connectCode] = socketName;
                                socket.join(socketName);
                                socket.emit('connectCode', connectCode);
                            });
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
        return PurpleMonkeyDishwasher().toLowerCase();
    }

    var getSession = function(connectCode){
        return connectingSessions[connectCode.toLowerCase()];
    }

    var endSession = function(connectCode){
        delete connectingSessions[connectCode];
    }

    var findFreeConnectCode = function(){
        return new Promise(function(resolve,reject){
            var connectCode = getConnectCode()
                if(!connectingSessions[connectCode])
                    resolve(connectCode);				
                else
                    findFreeConnectCode();
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