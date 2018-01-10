const routes = require('express').Router();

const User = require('../models/User');
const SessionManager = require('../SessionManager')

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

module.exports = routes;