const routes = require('express').Router();

const Quiz = require('./Quiz');
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
    let allAnswers = quiz.getAllAnswers(quizEntity);
    res.send(allAnswers);
})

module.exports = routes;