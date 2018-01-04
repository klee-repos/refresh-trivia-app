var SessionManager = require('../SessionManager');
const Game = require('../models/Game');

var execute = function(args, assistant){
    var game = new Game();
    var user = assistant.deviceProfile.user;
    user.game = game._id
    user.save();
    game.save();
    SessionManager.sendData(user.sessionCode, 'setStatus', 'mainMenu');
    assistant.say("<speak>Ok. Who's on team one?</speak>").finish();
}

var validateInput = function(args,assistant){
    if(!assistant.deviceProfile)
        return "I don't know this device, are you sure that you've connected?"
    if(!assistant.deviceProfile.user)
        return "Looks like you don't have a user, are you sure that you've connected?"
    return null;
}

var NewGameIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = NewGameIntent;