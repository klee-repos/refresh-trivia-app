const Game = require('../../models/Game');
const Question = require('../../models/Question');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')
const ContextMap = require('../../ContextMap')

var newContext = 'question'
var flashContext = 'roundStart'

var getUniqueQuestion = function(previousQuestions) {
    return new Promise(function(resolve, reject) {
        let unique = false;
        let random;
        while (unique === false) {
            random = parseInt(Math.random() * (10 - 1) + 1)
            for (let i = 0; i < previousQuestions.length; i++) {
                if (previousQuestions[i].qId === random) {
                    unique = false;
                    i = 0;
                    break;
                } else {
                    unique = true;
                }
            }
            if (previousQuestions.length < 1) {
                unique = true;
            }
        }
        resolve(random)
    })
}

var delayedContext = function(user) {
    setTimeout(function() {
        user.setContext(newContext, ContextMap[newContext].previous);
        SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
        user.save()
    }, 3000)
}

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.previousQuestions').then(function(game){
        let previousQuestions = game.gameState.previousQuestions;
        getUniqueQuestion(previousQuestions).then(function(random) {
            Question.findOne({qId:random}).then(function(question) {
                game.setQuestions(question)
                game.setRound(1, 'team1', 0, 1)
                user.setContext(flashContext, ContextMap[newContext].previous);
                SessionManager.sendData(user.sessionCode, 'setStatus', flashContext);
                SessionManager.sendData(user.sessionCode, 'setQuestion', question);
                delayedContext(user);
                game.save()
                user.save()
                assistant
                    .say('<speak><audio src="' + Sounds.forward + '"></audio>Starting trivia! Good luck!</speak>')
                    .setContext('guess', 1)
                    .reprompt('<speak>Only a few seconds remaining to answer...</speak>')
                    .finish()
            })
        })
    });
}

var validateInput = function(args, assistant){
    return null;
}

var ConfirmRoster = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConfirmRoster