var User = require('../models/User');
var SessionManager = require('../SessionManager');

var execute = function(args, resolve, reject){
    User.findOne({gAssistantId:args.uniqueUserId})
        .then(function(user){
            if (!user) {
                var user = new User();
                user.gAssistantId = args.uniqueUserId;
                user.sessionCode = User.generateSessionCode();
                user.save();
            }
            if(SessionManager.getSession(args.connectCode)){
                var room = SessionManager.getSession(args.connectCode);
                SessionManager.sendData(room, 're-connect', user.sessionCode);
                SessionManager.removeSession(args.connectCode);
            }
            resolve("Connected", {"uniqueUserId":user.gAssistantId});
        })
        .catch(function(err){
            reject("Error", {"error":err} ) 
        })
}

var ConnectIntent = {
    execute: execute
}

module.exports = ConnectIntent;