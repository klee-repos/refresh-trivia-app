const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const Sounds = require('../Sounds')

var newContext = 'rosterSetup'
var previousContext = 'mainMenu'

var execute = function(args, assistant){
    let game = new Game();
    let user = assistant.deviceProfile.user;
    user.game = game
    user.setContext(newContext, previousContext);
    user.save();
    game.save();
    SessionManager.sendData(user.sessionCode, 'setStatus', newContext);

    assistant
        .say('<speak><audio src="' + Sounds.forward + '"></audio>Who are all the players you\'d like to add to Team 1?</speak>')
        .setContext(newContext)
        .finish();
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