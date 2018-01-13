const Game = require('../../models/Game');
const Question = require('../../models/Question');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')

var newContext = 'roundStart'
var previousContext = 'readyToStart'

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

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.previousQuestions').then(function(game){
        let previousQuestions = game.gameState.previousQuestions;
        getUniqueQuestion(previousQuestions).then(function(random) {
            Question.findOne({qId:random}).then(function(question) {
                game.setQuestions(question)
                game.setRound(1, 'team1', 0)
                game.save()
                user.setContext(newContext, previousContext);
                SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
                user.save()
                assistant
                    .say('<speak><audio src="' + Sounds.forward + '"></audio>Starting trivia! Good luck!</speak>')
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