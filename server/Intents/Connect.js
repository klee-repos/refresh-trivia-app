var User = require('../models/User');
var SessionManager = require('../SessionManager');

var execute = function(args, assistant){
    var user = assistant.deviceProfile.user;
    if(!user){
        user = new User();        
        user.generateSessionCode();
        assistant.setUser(user)
        user.save();
    }
    var room = SessionManager.getSession(args.connectCode);
    SessionManager.sendData(room, 're-connect', user.sessionCode);
    assistant.say("Connected").finish();
}

var validateInput = function(args, assistant){
    if(!assistant.deviceProfile)
        return "I don't know this device, are you sure that you've connected?"
    if(!args.connectCode)
        return "Missing connectCode"
    return null;
}

var ConnectIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConnectIntent;