const SessionManager = require('../../SessionManager');
const Game = require('../../models/Game');

const Sounds = require('../../Sounds')

var newContext = 'question'
const ContextMap = require('../../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).then(function(game) {
        let random = parseInt(Math.random() * (10 - 1) + 1)
        Question.findOne({qId:random}).then(function(question) {
            game.setQuestions(question)
            user.setContext(newContext, ContextMap[newContext].previous);
            SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
            SessionManager.sendData(user.sessionCode, 'setQuestion', question);
            game.save();
            user.save();
            assistant
                .say('<speak><audio src="' + Sounds.forward + '"></audio>Next question</speak>')
                .setContext(newContext)
                .finish();
        })
    })
}

var validateInput = function(args,assistant){
    return null;
}

var BankIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = BankIntent;