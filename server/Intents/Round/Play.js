const SessionManager = require('../../SessionManager');
const Sounds = require('../../Sounds')
var newContext = 'question'
const ContextMap = require('../../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    user.setContext(newContext, ContextMap[newContext].previous);
    SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
    user.save();
    assistant
        .play(Sounds.forward)
        .say("Next question")
        .setContext('guess', 1)
        .finish();
}

var validateInput = function(args,assistant){
    return null;
}

var PlayIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = PlayIntent;