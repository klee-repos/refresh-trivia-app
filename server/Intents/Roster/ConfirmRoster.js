const Game = require('../../models/Game');
const Question = require('../../models/Question');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')

var newContext = 'roundStart'
var previousContext = 'readyToStart'



var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).then(function(game){
        let random = Math.random() * (9 - 1) + 1;
        Question.findById(random).then(function(question) {
            console.log(question)
        })
        game.setRound(1, 'team1', 0)
        game.save()
        user.setContext(newContext, previousContext);
        SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
        user.save()
        assistant
            .say('<speak><audio src="' + Sounds.forward + '"></audio>Starting trivia! Good luck!</speak>')
            .finish()
    });
}

var validateInput = function(args, assistant){
    return null;
}

var ConfirmRoster = {
    execute: execute,
    validateInput: validateInput
}

module.exports = ConfirmRoster