
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
            let counter = 1;
            let questions = []
            let answerKey = []
            let answersGiven = []
            let gameStateId = generateId();
            let chosenQuiz = quiz.getQuiz(quizEntity)
            let totalQuestions = chosenQuiz.questions.length;
            for (let i = 0; i < totalQuestions; i++) {
                let answers = chosenQuiz.questions[i].answers;
                for (let i = 0; i < answers.length; i++) {
                    answerKey.push(answers[i].key)
                    answersGiven.push(counter)
                    counter++;
                }
                questions.push({
                    state: "new",
                    question: chosenQuiz.questions[i].text,
                    answerKey: answerKey,
                    answersGiven: answersGiven
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

    this.formatAnswers = function(answers) {
        return new Promise(function(resolve, reject) {
            var answerKey = [];
            let column = [];
            let row = 0;
            
            for (let i = 0; i < answers.length; i++) {
                column.push(answers[i])
                if (row === 4) {
                    answerKey.push(column)
                    column = [];
                    row = 0;
                } else {
                    row++
                }
            }
            if (column.length > 0) {
                answerKey.push(column)
            }
            console.log(answerKey)
            resolve(answerKey)
        })
    }
    
    

}

module.exports = Game;