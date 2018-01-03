var User = require('../models/User')
var SessionManager = require('../SessionManager');
const Game = require('./components/Game');

var execute = function(args, assistant){
    let quizEntity = args.game;
    let question;
    const game = new Game().save();
    console.log(game)
    // game.createGame(quizEntity, gId).then(function(state) {
    //     for (let i = 0; i < state.totalQuestions; i++) {
    //         if (state.questions[i].state === 'new') {
    //             question = state.questions[i].question;
    //             var answersGiven = state.questions[i].answersGiven;
    //             game.formatAnswers(answersGiven).then(function(preparedAnswers) {
    //             SessionManager.io.emit('startGame', quizEntity, question, preparedAnswers);
    //                assistant
    //                 .say(question)
    //                 .finish();
    //             }
    //         }
    //     }
    // })	
}

var StartGameIntent = {
    execute: execute
}

module.exports = StartGameIntent;