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
        Game.findById(user.game).then(function(game) {
            let contexts = game.getContexts();
            for (let i = 0; i < contexts.length; i++) {
                switch(contexts[i].name) {
                    case 'rosterSetup':
                        SessionManager.sendData(user.sessionCode, 'setStatus', 'rosterSetup')
                        break;
                    default:
                        SessionManager.sendData(user.sessionCode, 'setStatus', 'rosterSetup')
                }
            }
            res.send(contexts);
        })
    })
})

module.exports = routes;