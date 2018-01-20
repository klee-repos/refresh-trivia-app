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

var delayedContext = function(user, context) {
    setTimeout(function() {
        user.setContext(context, ContextMap[context].previous);
        SessionManager.sendData(user.sessionCode, 'setStatus', context);
        user.save()
    }, 2000)
}

var execute = function(args, assistant){
    let guess = args.guess
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.nextQuestion').then(function(game) {
        let answer = game.gameState.nextQuestion.answer
        let round = game.gameState.round
        let currentTeam = game.gameState.teams[game.gameState.round.activeTeam].players
        if (guess.toLowerCase() === answer.toLowerCase()) {
            if (round.playerIndex < currentTeam.length - 1) {
                round.playerIndex++
            } else {
                round.playerIndex = 0;
            }
            round.questionIndex++
            assistant
                .say('<speak><audio src="' + Sounds.forward + '"></audio>Correct!</speak>')
                .setContext('guess', 0)
                .finish();
            user.setContext(correctFlashContext, ContextMap[correctFlashContext].previous);
            SessionManager.sendData(user.sessionCode, 'setRound', round);
            SessionManager.sendData(user.sessionCode, 'setStatus', correctFlashContext);
            delayedContext(user, correctContext);
        } else {
            if (round.activeTeam === 'team1') {
                round = game.setRound(round.round, 'team2', 0, 1)
            } else {
                round = game.setRound(round.round + 1, 'team1', 0, 1)
            }
            assistant
                .say('<speak><audio src="' + Sounds.backward + '"></audio>Incorrect!</speak>')
                .setContext('guess', 1)
                .finish();
            user.setContext(incorrectFlashContext, ContextMap[incorrectFlashContext].previous);
            SessionManager.sendData(user.sessionCode, 'setRound', round);
            SessionManager.sendData(user.sessionCode, 'setStatus', incorrectFlashContext);
            delayedContext(user, incorrectContext);
        }
        SessionManager.sendData(user.sessionCode, 'setRound', round);
        game.save()
        user.save()
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