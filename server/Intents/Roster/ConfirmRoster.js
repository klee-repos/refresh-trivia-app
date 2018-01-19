const Game = require('../../models/Game');
const Question = require('../../models/Question');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')
const ContextMap = require('../../ContextMap')

var newContext = 'question'
var flashContext = 'roundStart'

var delayedContext = function(user) {
    setTimeout(function() {
        user.setContext(newContext, ContextMap[newContext].previous);
        SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
        user.save()
    }, 3000)
}

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(user.game).then(function(game){
        Question.getRandomQuestion({
            category: game.currentCategory,  //ToDo: get random category            
            difficulty: 1 
        }).then(function(newQuestion){
            console.log(newQuestion)
            game.setQuestions(newQuestion)
            game.setRound(1, 'team1', 0, 1)
            user.setContext(flashContext, ContextMap[newContext].previous);
            SessionManager.sendData(user.sessionCode, 'setQuestion', newQuestion);
            SessionManager.sendData(user.sessionCode, 'setStatus', flashContext);
            delayedContext(user);
            game.save()
            user.save()
            assistant
                .play(Sounds.forward)
                .say("Starting trivia! Good luck!")
                .setContext('guess', 1)
                .reprompt('<speak>Only a few seconds remaining to answer...</speak>')
                .finish()
        })
    })
}

var validateInput = function(args, assistant){
    return null;
}

var ConfirmRoster = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConfirmRoster