var User = require('../models/User')
var SessionManager = require('../SessionManager');
const Game = require('../models/Game');

var execute = function(args, assistant){
    var game = new Game();
    // game.newGame();
    game.save();
    assistant.say("Ready to start?").data(game).finish();
}

var StartGameIntent = {
    execute: execute
}

module.exports = StartGameIntent;