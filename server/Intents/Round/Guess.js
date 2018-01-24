const SessionManager = require('../../SessionManager');
const Game = require('../../models/Game');
const Question = require('../../models/Question');

const Sounds = require('../../Sounds')

var correctContext = 'correctAnswer'
var correctFlashContext = 'correct'
var incorrectContext = 'steal'
var incorrectFlashContext = 'incorrect'
var flashContext = 'roundStart'
const ContextMap = require('../../ContextMap')

var firstDelayedContext = function(user, context) {
    setTimeout(function() {
        user.setContext(context, ContextMap[context].previous);
        SessionManager.sendData(user.sessionCode, 'setStatus', context);
        user.save()
    }, 3000)
}

var secondDelayedContext = function(user, context) {
    setTimeout(function() {
        user.setContext(context, ContextMap[context].previous);
        SessionManager.sendData(user.sessionCode, 'setStatus', context);
        user.save()
    }, 6000)
}

var updateGameOnBrowser = function(user, round, context) {
    console.log(round)
    user.setContext(context, ContextMap[context].previous);
    SessionManager.sendData(user.sessionCode, 'setRound', round);
    SessionManager.sendData(user.sessionCode, 'setStatus', context);
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

var updateAssistant = function(result, assistant, steal) {
    if (result === true) {
        assistant
            .play(Sounds.forward)
            .say('Correct!')
        if (steal) {
            assistant
                .setContext('guess', 1)
        }
    } else {
        assistant
            .play(Sounds.backward)
            .say('Incorrect!')
            .setContext('guess', 1)
    }
    assistant.finish()
}

var execute = function(args, assistant){
    let guess = args.guess
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.nextQuestion').then(function(game) {
        var round = game.gameState.round
        game.guess(guess, user.context).then(function(result) {
            if (result.bonus === true) {
                console.log('bonus hit')
                SessionManager.sendData(user.sessionCode, 'setQuestion', result.question);
                updateAssistant(result.guess, assistant, true)
                updateGameOnBrowser(user, round, 'bonus')
                firstDelayedContext(user, 'roundStart')
                secondDelayedContext(user, 'question');
                game.save()
                user.save()
                
                return;
            }

            if (round.round === 6) {
                if (result.guess === true) {
                    SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:round.activeTeam, score: result.coins});
                } else {
                    if (round.activeTeam === 'team1') {
                        team = 'team2'
                    } else {
                        team = 'team1'
                    }
                    SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:team, score: result.coins});
                }
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
                SessionManager.sendData(user.sessionCode, 'setWinner', winner);
                updateGameOnBrowser(user, round, 'finish')
                finishAssistant(assistant, winner)
                game.save()
                user.save()
                return;
            }
            
            let currentTeam = game.gameState.teams[game.gameState.round.activeTeam].players
            let score = game.gameState.teams[round.activeTeam].score
            updateAssistant(result.guess, assistant, result.steal)

            if (result.guess === true && result.steal === false) {
                updateGameOnBrowser(user, round, correctFlashContext)
                firstDelayedContext(user, correctContext);
            }

            if (result.guess === true && result.steal === true) {
                
                updateGameOnBrowser(user, round, 'correctSteal')
                SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:round.activeTeam, score: result.coins});
                firstDelayedContext(user, 'roundStart');
                secondDelayedContext(user, 'question')
            }

            if (result.guess === false && result.steal === false) {
                updateGameOnBrowser(user, round, incorrectFlashContext)
                firstDelayedContext(user, incorrectContext);
            }

            if (result.guess === false && result.steal === true) {
                let team;
                if (round.activeTeam === 'team1') {
                    team = 'team2'
                } else {
                    team = 'team1'
                }
                updateGameOnBrowser(user, round, 'incorrectSteal')
                SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:team, score: result.coins});
                firstDelayedContext(user, 'roundStart');
                secondDelayedContext(user, 'question')
            }
            SessionManager.sendData(user.sessionCode, 'setQuestion', result.question);
            game.save()
            user.save()
        })
    })
}

var validateInput = function(args,assistant){
    return null;
}

var GuessIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GuessIntent;