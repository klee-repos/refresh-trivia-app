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

    this.getAllAnswers = function(quizEntity) {
        let answers = {};
        let questions = quizes[quizEntity].questions;
        for (let i = 0; i < questions.length; i++) {
            answers[questions[i].id] = questions[i].answers;
        }
        console.log(answers)
        return answers
    }

}

module.exports = Quiz;