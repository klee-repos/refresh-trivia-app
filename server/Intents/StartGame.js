var QuizGames = require('../Quizes')
var User = require('../models/User')
var SessionManager = require('../SessionManager');

var execute = function(args, resolve,reject){
    var question = QuizGames[args.game].questions[0].text
    SessionManager.sendData("startGame", "test", question);
    resolve(question);
}

var StartGameIntent = {
    execute: execute
}

module.exports = StartGameIntent;