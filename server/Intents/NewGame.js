const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const Sounds = require('../Sounds')

var newContext = 'rosterSetup'
const ContextMap = require('../ContextMap')

var execute = function(args, assistant){
    let game = new Game();
    let user = assistant.deviceProfile.user;
    user.game = game
    user.setContext(newContext, ContextMap[newContext].previous);
    user.save();
    game.save();
    SessionManager.sendData(user.sessionCode, 'setStatus', newContext);

    assistant
        .play(Sounds.forward)
        .say("Game created. Please tell me who to add to each team.")
        .setContext(newContext)
        .reprompt('<speak>Who would you like to add to team 1?</speak>')
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