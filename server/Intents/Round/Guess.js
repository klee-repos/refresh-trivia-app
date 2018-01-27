const SessionManager = require('../../SessionManager');
const Game = require('../../models/Game');
const Question = require('../../models/Question');
var ScriptGenerator = require('./GuessScript');
var Script;

var correctContext = 'correctAnswer'
var correctFlashContext = 'correct'
var incorrectContext = 'steal'
var incorrectFlashContext = 'incorrect'
var flashContext = 'roundStart'
const ContextMap = require('../../ContextMap')

updateScoreOnBrowser = function(user, game){
    var score = {
        team1: game.gameState.teams.team1.score,
        team2: game.gameState.teams.team2.score
    }
    SessionManager.sendData(user.sessionCode, 'setScore', score);
}

updateState = function(user, context, delay)
{
    var stateUpdate = function(){
        user.setContext(context, ContextMap[context].previous)
        SessionManager.sendData(user.sessionCode, 'setStatus', context);
        user.save()
    }

    if(!delay) stateUpdate()
    else setTimeout(stateUpdate,delay)
}

var updateGameOnBrowser = function(user, round, context) {
    SessionManager.sendData(user.sessionCode, 'setRound', round);
    updateState(user,context)
}

var execute = function(args, assistant){
    Script = new ScriptGenerator(assistant)
    let guess = args.guess
    let user = assistant.deviceProfile.user;
    Game.findById(user.game).populate('gameState.nextQuestion').then(function(game) {
        game.guess(guess, user.context).then(function(result) {
            //GAME OVER
            if (game.gameState.round.round === 6) {
                gameOver(game,result,assistant, user);
            }           
            //BONUS
            else if (result.bonus) {
                bonus(game, result,assistant, user);
            } 
            //STEAL
            else if (result.steal){
                steal(game, result, assistant, user)
            } else {
                regularGuess(game,result,assistant,user)
            }
        })
    })
}

var saveAndFinish = function(game,assistant, user){
    game.save()
    user.save()
    assistant.finish()
}

var regularGuess = function(game, result, assistant, user){
    var round = game.gameState.round;
    if(result.guess){
        Script.correct(game); 
        Script.playOrBank(game);

        updateGameOnBrowser(user, round, correctFlashContext)
        updateState(user, correctContext, 3000)
    }

    else {
        Script.incorrect(game);
        Script.chanceToSteal(game)

        updateGameOnBrowser(user, round, incorrectFlashContext)
        updateState(user, incorrectContext, 3000)
    }
    saveAndFinish(game,assistant,user)
    SessionManager.sendData(user.sessionCode, 'setQuestion', result.question);
}

var steal = function(game,result, assistant, user){
    //SUCCESSFUL STEAL
    var round = game.gameState.round;
    if(result.guess){
        Script.correct(game);
        Script.changeTurns(game);
        updateGameOnBrowser(user, round, 'correctSteal')
    } 
    //UNSUCCESSFUL STEAL
    else {
        Script.incorrect(game);
        Script.changeTurns(game);
        updateGameOnBrowser(user, round, 'incorrectSteal')
    }
    updateScoreOnBrowser(user, game)
    updateState(user, 'roundStart', 3000);
    updateState(user, 'question', 6000)
    saveAndFinish(game,assistant,user)
}

var bonus = function(game, result, assistant, user){
    var round = game.gameState.round;
    SessionManager.sendData(user.sessionCode, 'setQuestion', result.question);
    Script.bonus(game);

    updateScoreOnBrowser(user, game)
    updateGameOnBrowser(user, round, 'bonus')
    updateState(user, 'roundStart', 3000)
    updateState(user, 'question', 6000);
    saveAndFinish(game,assistant,user)
}

/* OLD GAME OVER */
// if (round.round === 6) {
//     if (result.guess === true) {
//         SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:round.activeTeam, score: result.coins});
//     } else {
//         if (round.activeTeam === 'team1') {  
//             team = 'team2'
//         } else {
//             team = 'team1'
//         }
//         SessionManager.sendData(user.sessionCode, 'setScore', {activeTeam:team, score: result.coins});
//     }
//     let teamOneScore = game.gameState.teams.team1.score
//     let teamTwoScore = game.gameState.teams.team2.score
//     let winner;
//     if (teamOneScore > teamTwoScore) {
//         winner = 'Team 1'
//     } else {
//         winner = 'Team 2'
//     }
//     if (teamOneScore === teamTwoScore) {
//         winner = 'Everyone'
//     }
//     SessionManager.sendData(user.sessionCode, 'setWinner', winner);
//     updateGameOnBrowser(user, round, 'finish')
//     finishAssistant(assistant, winner)
//     game.save()
//     user.save()
//     return;
// }

var gameOver = function(game, result, assistant){

    updateScoreOnBrowser(game)
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

    var round = game.gameState.round;

    Script.gameOver(assistant, game.getWinningTeam())

    updateGameOnBrowser(user, round, 'finish')
    saveAndFinish(game,assistant,user)
}

var validateInput = function(args,assistant){
    return null;
}

var GuessIntent = {
    execute: execute,
    validateInput: validateInput
}

module.exports = GuessIntent;