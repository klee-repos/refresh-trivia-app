const SessionManager = require('../../SessionManager');
const Game = require('../../models/Game');
const Question = require('../../models/Question')

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
    Game.findById(assistant.deviceProfile.user.game).then(function(game) {
        let nextTeam;
        let round = game.gameState.round
        let applyScore;
        switch(round.questionIndex) {
            case 1: applyScore = 100
            case 2: applyScore = 200
            case 3: applyScore = 300
            case 4: applyScore = 400
            case 5: applyScore = 500
        }
        game.gameState.teams[round.activeTeam].score += applyScore
        if (round.activeTeam === 'team1') {
            nextTeam = 'Team 2'
            round = game.setRound(round.round, 'team2', 0, 1)
            console.log(round)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        } else {
            nextTeam = 'Team 1'
            round = game.setRound(round.round + 1, 'team1', 0, 1)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        }
        let random = parseInt(Math.random() * (10 - 1) + 1)
        Question.findOne({qId:random}).then(function(newQuestion) {
            game.setQuestions(newQuestion).then(function(question) {
                user.setContext(newContext, ContextMap[newContext].previous);
                SessionManager.sendData(user.sessionCode, 'setQuestion', question);
                SessionManager.sendData(user.sessionCode, 'setStatus', flashContext);
                delayedContext(user);
                game.save();
                user.save();
                assistant
                    .say('<speak><audio src="' + Sounds.forward + '"></audio>Coins banked! ' + nextTeam + ' you\'re up!</speak>')
                    .setContext('guess', 1)
                    .finish();
            })
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