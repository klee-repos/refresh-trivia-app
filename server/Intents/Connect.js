var User = require('../models/User');
var SessionManager = require('../SessionManager');

var execute = function(args, assistant){
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

            assistant
                .say("Connected")
                .data({"uniqueUserId":user.gAssistantId})
                .finish();
        })
        .catch(function(err){
            assistant.say("Error").error(err.code).data(err).finish();
        })
}

var validateInput = function(args){
    if(!args.uniqueUserId || args.uniqueUserId ==null || args.uniqueUserId.length == 0)
        return "Missing userId";
    if(!args.connectCode)
        return "Missing connectCode"
    return null;
}

var ConnectIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConnectIntent;