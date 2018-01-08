const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const contextName = 'newGame';
const lifespan = 5

var execute = function(args, assistant){
    let game = new Game();

    let user = assistant.deviceProfile.user;
    user.game = game
    let contexts = game.createContext(contextName, lifespan)
    user.save();
    game.save();
    SessionManager.sendData(user.sessionCode, 'setStatus', 'rosterSetup');

    assistant
        .say("<speak>New Game. Please set the players on each team.</speak>")
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