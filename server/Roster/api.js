const routes = require('express').Router();

const User = require('../models/User');
const Game = require('../models/Game');
const SessionManager = require('../SessionManager')

// Get object of all quiz names
routes.post('/getRoster', function(req, res) {
    let sessionCode = req.body.sessionCode;
    let teamOne;
    let teamTwo;
    let roster;
    User.findOne({sessionCode:sessionCode}).then(function(user) {
        Game.findById(user.game).then(function(game) {
            teamOne = game.getTeamOne()
            teamTwo = game.getTeamTwo()
            roster = {
                teamOne: teamOne.players,
                teamTwo: teamTwo.players,
            }
            SessionManager.sendData(sessionCode, 'teamOneRoster', teamOne.players);
            SessionManager.sendData(sessionCode, 'teamTwoRoster', teamTwo.players);
            res.send(roster);
        })
    })
})

module.exports = routes;