const routes = require('express').Router();

const Quiz = require('../components/Quiz');
const quiz = new Quiz();

// Get object of all quiz names
routes.get('/allQuizes', function(req, res) {
    let allQuizes = quiz.getAllQuizes()
    res.send(allQuizes);
})

// Returns all answers to each question attached to a quiz entity 
routes.post('/allAnswers', function(req,res) {
    if (!req.body.quizEntity) {
        res.send('Missing input: Need to supply quiz entity name in request body')
        return;
    }
    let quizEntity = req.body.quizEntity;
    let allAnswers = quiz.getAnswers(quizEntity);
    res.send(allAnswers);
})

//Returns all questions attched to a quiz entity
routes.post('/allQuestions', function(req,res) {
    if (!req.body.quizEntity) {
        res.send('Missing input: Need to supply quiz entity name in request body')
        return;
    }
    let quizEntity = req.body.quizEntity;
    let allQuestions = quiz.getQuestions(quizEntity);
    res.send(allQuestions)
})

routes.get('')

module.exports = routes;