const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const Sounds = require('../Sounds')
const ContextMap = require('../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    let location;
    var newContext = ContextMap[user.context].previous
    SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
    user.setContext(newContext, ContextMap[newContext].previous);
    user.save();

    switch(newContext) {
        case 'mainMenu':
            location = 'Main menu';
            break;
        case 'readyToStart':
            location = 'Team rosters';
            break;
        default:
            location = 'Back';
    }

    assistant
        .play(Sounds.backward)
        .say(location)
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