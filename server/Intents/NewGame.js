var User = require('../models/User')
var SessionManager = require('../SessionManager');
const Game = require('../models/Game');

var execute = function(args, assistant){

    var game = new Game()
    game.save().then(function() {
        User.findOne({gAssistantId:args.uniqueUserId}).then(function(user) {
            user.gameId = game._id
            user.save()
            assistant.say("<speak>Ok. Who's on team one?</speak>").finish();
        })
    })
}

var NewGameIntent = {
    execute: execute
}

module.exports = NewGameIntent;