const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const contextName = 'rosterSetup';
const lifespan = 5

const forwardURL = 'https://storage.googleapis.com/trivia-df1da.appspot.com/sounds/forward.wav';

var execute = function(args, assistant){
    let game = new Game();

    let user = assistant.deviceProfile.user;
    user.game = game
    let contexts = game.createContext(contextName, lifespan)
    user.save();
    game.save();
    SessionManager.sendData(user.sessionCode, 'setStatus', 'rosterSetup');

    assistant
        .say('<speak><audio src="' + forwardURL + '"></audio>Who are all the players you\'d like to add to Team 1?</speak>')
        .setContext(contexts)
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