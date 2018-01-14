const SessionManager = require('../SessionManager');
const Game = require('../models/Game');
const Question = require('../models/Question');

const Sounds = require('../Sounds')

var newContext = 'question'
const ContextMap = require('../ContextMap')

var execute = function(args, assistant){
    let guess = args.guess
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).populate('gameState.nextQuestion').populate('gameState.previousQuestions').then(function(game) {
        console.log(game)
        let answer = game.gameState.nextQuestion.answer
        let round = game.gameState.round
        let currentTeam = game.gameState.teams[game.gameState.round.activeTeam].players
        if (guess.toLowerCase() === answer.toLowerCase()) {
            if (round.playerIndex < currentTeam.length - 1) {
                round.playerIndex++
            } else {
                round.playerIndex = 0;
            }
            assistant
                .say('<speak><audio src="' + Sounds.forward + '"></audio>Correct!</speak>')
                .setContext('guess', 1)
                .finish();
        } else {
            if (round.activeTeam === 'team1') {
                game.setRound(1, 'team2', 0)
            } else {
                game.setRound(1, 'team1', 0)
            }
            assistant
                .say('<speak><audio src="' + Sounds.backward + '"></audio>Incorrect!</speak>')
                .setContext('guess', 1)
                .finish();
        }
        let random = parseInt(Math.random() * (10 - 1) + 1)
        Question.findOne({qId:random}).then(function(question) {
            game.setQuestions(question)
            SessionManager.sendData(user.sessionCode, 'setQuestion', question);
            SessionManager.sendData(user.sessionCode, 'setRound', round);
            game.save()
        })
    })
}

// var isAnAnswer = function(guess,answers){
//     var answer = null;
//     guess = guess.toLowerCase();
//     answers.some(function(ans){
//         if(ans.key.toLowerCase() === guess){
//             answer = ans;
//             return true;
//         }
//         if(ans.phrasings.some(function(phr){
//             if(phr.toLowerCase() === guess){
//                 answer = ans;
//             }
//         }));
//     });
//     return answer;
// }

var validateInput = function(args,assistant){
    return null;
}

var GuessIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GuessIntent;