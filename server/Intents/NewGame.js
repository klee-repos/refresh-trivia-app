var User = require('../models/User')
var SessionManager = require('../SessionManager');
const Game = require('../models/Game');

var execute = function(args, assistant){
    var game = new Game()
    game.save().then(function() {
        User.findOne({_id: assistant.device.user}).then(function(user) {
            let sessionCode = user.sessionCode
            user.gameId = game._id
            user.save()
            SessionManager.sendData(sessionCode,'setStatus', 'mainMenu');
            assistant.say("<speak>Ok. Who's on team one?</speak>").finish();
        })
    })
}

var NewGameIntent = {
    execute: execute
}

module.exports = NewGameIntent;