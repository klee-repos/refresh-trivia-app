var User = require('../models/User')
var SessionManager = require('../SessionManager');
const Game = require('../models/Game');

var execute = function(args, assistant){
    var game = new Game();
    game.save();
    assistant.say("Ready to start?").data(game).finish();
}

var NewGameIntent = {
    execute: execute
}

module.exports = NewGameIntent;