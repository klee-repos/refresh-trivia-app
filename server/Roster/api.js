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
            teams = game.getTeams()
            roster = {
                teamOne: teams.team1.players,
                teamTwo: teams.team2.players,
            }
            SessionManager.sendData(sessionCode, 'teamRoster', teams);
            res.send(roster);
        })
    })
})

module.exports = routes;