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

var updateGameOnBrowser = function(user, round, context) {
    user.setContext(context, ContextMap[context].previous);
    SessionManager.sendData(user.sessionCode, 'setRound', round);
    SessionManager.sendData(user.sessionCode, 'setStatus', context);
    
}

var updateAssistant = function(result, assistant, steal) {
    if (result === true) {
        assistant
            .say('<speak><audio src="' + Sounds.forward + '"></audio>Correct!</speak>')
        if (steal) {
            assistant
                .setContext('guess', 1)
        }

    } else {
        assistant
            .say('<speak><audio src="' + Sounds.backward + '"></audio>Incorrect!</speak>')
            .setContext('guess', 1)
    }
    assistant.finish()
}

var execute = function(args, assistant){
    let guess = args.guess
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.nextQuestion').then(function(game) {
        var round = game.gameState.round
        let currentTeam = game.gameState.teams[game.gameState.round.activeTeam].players
        game.guess(guess, user.context).then(function(result) {
            let score = game.gameState.teams[round.activeTeam].score
            updateAssistant(result.guess, assistant, result.steal)

            if (result.guess === true && result.steal === false) {
                if (result.win === true) {
                    // win logic needed
                } else {
                    updateGameOnBrowser(user, round, correctFlashContext, game)
                    delayedContext(user, correctContext);
                }
            }

            if (result.guess === true && result.steal === true) {
                updateGameOnBrowser(user, round, 'roundStart')
                SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:round.activeTeam, score: result.coins});
                delayedContext(user, 'question');
            }

            if (result.guess === false && result.steal === false) {
                updateGameOnBrowser(user, round, incorrectFlashContext)
                delayedContext(user, incorrectContext);
            }

            if (result.guess === false && result.steal === true) {
                let team;
                if (round.activeTeam === 'team1') {
                    team = 'team2'
                } else {
                    team = 'team1'
                }
                updateGameOnBrowser(user, round, 'roundStart')
                SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:team, score: result.coins});
                delayedContext(user, 'question');
            }

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