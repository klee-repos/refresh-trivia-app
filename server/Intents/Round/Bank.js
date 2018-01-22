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
        switch(round.questionIndex - 1) {
            case 1: applyScore = 100; break;
            case 2: applyScore = 300; break;
            case 3: applyScore = 700; break;
            case 4: applyScore = 1500; break;
            case 5: applyScore = 3100; break;
        }
        let newScore = game.gameState.teams[round.activeTeam].score + applyScore
        game.gameState.teams[round.activeTeam].score += applyScore
        SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:round.activeTeam, score: newScore});
        if (round.activeTeam === 'team1') {
            nextTeam = 'Team 2'
            round = game.setRound(round.round, 'team2', 0, 1)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        } else {
            nextTeam = 'Team 1'
            round = game.setRound(round.round + 1, 'team1', 0, 1)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        }
        
        Question.getRandomQuestion({
        }).then(function(newQuestion){
            console.log(newQuestion)
            game.setQuestions(newQuestion)
            user.setContext(newContext, ContextMap[newContext].previous);
            SessionManager.sendData(user.sessionCode, 'setQuestion', newQuestion);
            SessionManager.sendData(user.sessionCode, 'setStatus', flashContext);
            delayedContext(user);
            game.save();
            user.save();
            assistant
                .play(Sounds.forward)
                .say('Banked! ' + nextTeam + ' you\'re up!')
                .setContext('guess', 1)
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