
const Quiz = require('./Quiz');
const quiz = new Quiz();

var guid = require('uuid/v4')

var GameState = require('../models/GameState');

var generateId = function() {
    return guid();
}

var Game = function() {

    this.createGame = function(quizEntity, gId) {
        return new Promise(function(resolve,reject) {
            let questions = []
            let gameStateId = generateId();
            let chosenQuiz = quiz.getQuiz(quizEntity)
            let totalQuestions = chosenQuiz.questions.length;
            for (let i = 0; i < totalQuestions; i++) {
                questions.push({
                    state: "new",
                    question: chosenQuiz.questions[i].text,
                    answers: chosenQuiz.questions[i].answers,
                })
            }
            let state = {
                gameStateId: gameStateId,
                gAssistantId: gId,
                status: 'new',
                quizId: chosenQuiz.id,
                type: chosenQuiz.type,
                totalQuestions: totalQuestions,
                questions: questions,
            }
            let gameState = GameState(state);
            gameState.save();
            resolve(state);
        })  
    } 

}

module.exports = Game;