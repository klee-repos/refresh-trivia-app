var Promise = require('bluebird');

var quizes = require('../Quizes')

function Quiz() {

    this.getAllQuizes = function() {
        let quizNames = {}
        let totalQuizes = Object.keys(quizes).length;
        for (let i = 0; i < totalQuizes; i++) {
            quizNames[Object.keys(quizes)[i]] = {
                id: quizes[Object.keys(quizes)[i]].id,
                name: quizes[Object.keys(quizes)[i]].name,
                type: quizes[Object.keys(quizes)[i]].type
            }
        }
        return quizNames;
    }

    this.getAnswers = function(quizEntity) {
        let allAnswers = {};
        let questions = quizes[quizEntity].questions;
        for (let i = 0; i < questions.length; i++) {
            allAnswers[questions[i].id] = questions[i].answers;
        }
        return allAnswers
    }

    this.getQuestions = function(quizEntity) {
        let allQuestions = {};
        let questions = quizes[quizEntity].questions;
        for (let i = 0; i < questions.length; i++) {
            allQuestions[questions[i].id] = questions[i].text;
        }
        return allQuestions
    }

    this.getQuiz = function(quizEntity) {
        let quiz = quizes[quizEntity];
        return quiz;
    }

}

module.exports = Quiz;