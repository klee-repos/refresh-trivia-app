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

updateScoreOnBrowser = function(user, game){
    var score = {
        team1: game.gameState.teams.team1.score,
        team2: game.gameState.teams.team2.score
    }
    SessionManager.sendData(user.sessionCode, 'setScore', score);
}

var finishAssistant = function(assistant, winner) {
    if (winner === 'Team 1') {
        assistant
            .say('Game over. Team 1 you win!')
    } else {
        assistant
            .say('Game over. Team 2 you win!')
    }
    assistant
        .play(Sounds.forward)
        .finish()
}

var execute = function(args, assistant){
    
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).then(function(game) {
        var round = game.gameState.round

        let nextTeam;
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

        updateScoreOnBrowser(user, game)

        if (round.activeTeam === 'team1') {
            nextTeam = 'Team 2'
            round = game.setRound(round.round, 'team2', 0, 1)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        } else {
            nextTeam = 'Team 1'
            round = game.setRound(round.round + 1, 'team1', 0, 1)
            SessionManager.sendData(user.sessionCode, 'setRound', round);
        }

        if (round.round === 6) {
            let teamOneScore = game.gameState.teams.team1.score
            let teamTwoScore = game.gameState.teams.team2.score
            let winner;
            if (teamOneScore > teamTwoScore) {
                winner = 'Team 1'
            } else {
                winner = 'Team 2'
            }
            if (teamOneScore === teamTwoScore) {
                winner = 'Everyone'
            }
            user.setContext('finish', ContextMap['finish'].previous);
            SessionManager.sendData(user.sessionCode, 'setWinner', winner);
            SessionManager.sendData(user.sessionCode, 'setStatus', 'finish');
            finishAssistant(assistant, winner)
            game.save()
            user.save()
            return;
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