const routes = require('express').Router();

const User = require('../models/User');
const Question = require('../models/Question');
const SessionManager = require('../SessionManager')

routes.post('/getRoster', function(req, res) {
    let sessionCode = req.body.sessionCode;
    let teamOne;
    let teamTwo;
    let roster;
    User.findOne({sessionCode:sessionCode}).populate('game').then(function(user) {
        teams = user.game.getRoster()
        roster = {
            teamOne: teams.team1.players,
            teamTwo: teams.team2.players,
        }
        SessionManager.sendData(sessionCode, 'teamRoster', roster);
        res.send(roster);
    })
})

routes.post('/getRound', function(req, res) {
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).populate('game').then(function(user) {
        let round = user.game.gameState.round
        SessionManager.sendData(sessionCode, 'setRound', round);
        res.send(round)
    })
})

routes.post('/getQuestion', function(req, res) {
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).populate('game').then(function(user) {
        Question.findById(user.game.gameState.nextQuestion).then(function(question) {
            let questionData = {
                text: question.text,
                picklist: question.picklist,
                mediaURL: question.mediaURL
            }
            SessionManager.sendData(sessionCode, 'setQuestion', questionData);
            res.send(questionData)
        })
        .catch(function(err){
            console.log(err)
        })
    })
})

module.exports = routes;