const SessionManager = require('../SessionManager');
const Game = require('../models/Game');

const Sounds = require('../Sounds')
const ContextMap = require('../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;

    switch(args.page) {
        case 'main menu':
            SessionManager.sendData(user.sessionCode, 'setGoTo', '');
            break;
        case 'help':
            SessionManager.sendData(user.sessionCode, 'setGoTo', 'help');
            break;
        case 'about':
            SessionManager.sendData(user.sessionCode, 'setGoTo', 'about');
            break
        default:
            SessionManager.sendData(user.sessionCode, 'setGoTo', '');
    }

    assistant
        .play(Sounds.forward)
        .say(args.page)
        .finish()
}

var validateInput = function(args,assistant){
    return null;
}

var GoToIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GoToIntent;