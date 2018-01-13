const SessionManager = require('../SessionManager');
const User = require('../models/User');
const Device = require('../models/DeviceProfile');

const Sounds = require('../Sounds')

var newContext = 'mainMenu'
const previousContext = 'connect'

var execute = function(args, assistant){
    var user = assistant.deviceProfile.user;
    
    if(!user){
        user = new User();        
        user.generateSessionCode();
        user.setContext(newContext, previousContext);
        assistant.setUser(user)
        user.save();
    }
    var room = SessionManager.getSession(args.connectCode);
    SessionManager.sendData(room, 're-connect', user.sessionCode);
    SessionManager.sendData(room, 'setStatus', newContext);
    assistant.say('<speak><audio src="' + Sounds.forward + '"><desc>Connected</desc></audio></speak>').finish();
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