const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const Sounds = require('../Sounds')

let newContext;

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    let location;
    newContext = user.getPreviousContext()
    SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
    user.setContext(newContext, user.context.name);
    user.save();

    if (newContext === 'mainMenu') {
        location = 'main menu';
    }
    assistant
        .say('<speak><audio src="' + Sounds.backward + '"></audio>Going back to ' + location + '</speak>')
        .finish()
}

var validateInput = function(args,assistant){
    return null;
}

var GoBackIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GoBackIntent;