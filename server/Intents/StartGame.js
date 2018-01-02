var QuizGames = require('../Quizes')
var User = require('../models/User')
var SessionManager = require('../SessionManager');

var execute = function(args, resolve,reject){
    var question = QuizGames[args.game].questions[0]
    SessionManager.sendData("startGame", "test", question.text);
    resolve(question.text);
}

var StartGameIntent = {
    execute: execute
}

module.exports = StartGameIntent;