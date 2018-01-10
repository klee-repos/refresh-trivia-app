const routes = require('express').Router();

const User = require('../models/User');
const Game = require('../models/Game');
const SessionManager = require('../SessionManager')

var csv = require("fast-csv");

// Input file
const questionsFile = './questions.txt';

// Get object of all quiz names
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

routes.post('/getContext', function(req,res) {
    let sessionCode =req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).then(function(user) {
        SessionManager.sendData(user.sessionCode, 'setStatus', user.context.name)
        res.send(user);
    })
})

routes.post('/setQuestions', function(req,res) {
    let test = []
    csv
        .fromPath('TriviaQuestions')
        .on("data", function(data){
            console.log(data);
            test.push(data)
        })
        .on("end", function(){
            console.log("done");
        });
    resolve(test)
})

module.exports = routes;