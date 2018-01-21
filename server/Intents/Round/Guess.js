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

var updateAssistant = function(result, assistant) {
    if (result.guess === 'true') {
        assistant
        .say('<speak><audio src="' + Sounds.forward + '"></audio>Correct!</speak>')

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
            console.log(result)
            updateAssistant(result, assistant)

            // Guess = true

            if (result.guess === true && result.steal === false) {
                if (result.win === true) {
                    // win logic
                } else {
                    updateGameOnBrowser(user, round, correctFlashContext)
                    delayedContext(user, correctContext);
                }
            }

            if (result.guess === true && result.steal === true) {
                updateGameOnBrowser(user, round, 'roundStart')
                delayedContext(user, 'question');
            }

            // Guess = false

            if (result.guess === false && result.steal === false) {
                updateGameOnBrowser(user, round, incorrectFlashContext)
                delayedContext(user, incorrectContext);
            }

            if (result.guess === false && result.steal === true) {
                updateGameOnBrowser(user, round, 'roundStart')
                delayedContext(user, 'question');
            }

            game.save()
            user.save()
        })
    })
}

// var execute = function(args, assistant){
//     let guess = args.guess
//     let user = assistant.deviceProfile.user;
//     Game.findById(assistant.deviceProfile.user.game).populate('gameState.nextQuestion').then(function(game) {
//         let answer = game.gameState.nextQuestion.answer
//         var round = game.gameState.round
//         let currentTeam = game.gameState.teams[game.gameState.round.activeTeam].players
//         if (guess.toLowerCase() === answer.toLowerCase()) {
//             if (round.playerIndex < currentTeam.length - 1) {
//                 round.playerIndex++
//             } else {
//                 round.playerIndex = 0;
//             }
//             round.questionIndex++
//             assistant
//                 .say('<speak><audio src="' + Sounds.forward + '"></audio>Correct!</speak>')
//                 .setContext('guess', 0)
//                 .finish();
//             updateGameOnBrowser(user, round, correctFlashContext)
//             delayedContext(user, correctContext);
//         } else {
//             if (round.activeTeam === 'team1') {
//                 round.activeTeam = 'team2'
//                 round.playerIndex = 0
//             } else {
//                 round.activeTeam = 'team1'
//                 round.round++
//                 round.playerIndex = 0
//             }
//             assistant
//                 .say('<speak><audio src="' + Sounds.backward + '"></audio>Incorrect!</speak>')
//                 .setContext('guess', 1)
//                 .finish();
//             updateGameOnBrowser(user, round, incorrectFlashContext)
//             delayedContext(user, incorrectContext);
//         }
//         SessionManager.sendData(user.sessionCode, 'setRound', round);
//         game.save()
//         user.save()
//     })
// }

var validateInput = function(args,assistant){
    return null;
}

var GuessIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GuessIntent;