var Game = require('../models/Game');
var SessionManager = require('../SessionManager')

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game)
        .then(function(game){
            game.updateRoster(args.names, args.teamName)
                .then(function(){
                    game.save();
                    assistant.say()
                })
                .catch(function(err){
                    assistant.error(500).data(err).finish();
                })
        })
    assistant.finish()
}

var validateInput = function(args, assistant){
    if(!args.names || args.names.length == 0)
        return "Didn't get a list of players";
    if(!args.teamName || args.teamName.length == 0)
        return "Didn't get a teamName"

    return null;
}

var AddTeamMembersIntent = {
    execute: execute,
    validateInput: validateInput,
    logInput: true
}

module.exports = AddTeamMembersIntent