const SessionManager = require('../SessionManager');
const Game = require('../models/Game');
const Errors = require('../ErrorMessages')
const Sounds = require('../Sounds')
const ContextMap = require('../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;

    switch(args.page) {
        case 'main menu':
            user.setContext("mainMenu");
            user.save();
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
        .say(args.page).pause("1s").say("Tell me a command to continue.")
        .reprompt.say('Tell me a command to continue, or say exit to close')
        .finish()
}

var validateInput = function(args,assistant){
    if(!assistant.deviceProfile)
        return Errors.NeedToConnect
    if(!assistant.deviceProfile.user)
        return Errors.NeedToConnect
    return null;
}

var GoToIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GoToIntent;