var User = require('../models/User');
var Device = require('../models/Device');
var SessionManager = require('../SessionManager');

var execute = function(args, assistant){
    var user;
    if(!assistant.device.user){
        user = new User();        
        user.generateSessionCode();
        assistant.setUser(user)
        user.save();
    }

    var room = SessionManager.getSession(args.connectCode);
    SessionManager.sendData(room, 're-connect', user.sessionCode);

    assistant.say("Connected").finish();
}

var validateInput = function(args){
    if(!args.device)
        return "I don't know this device"
    if(!args.connectCode)
        return "Missing connectCode"
    return null;
}

var ConnectIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConnectIntent;