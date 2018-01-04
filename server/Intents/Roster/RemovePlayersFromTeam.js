var Game = require('../../models/Game');
var SessionManager = require('../../SessionManager')

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game)
    .then(function(game){
        game.removePlayersFromTeam(args.names, args.teamName)
            .then(function(){
                console.log(game)
                game.save();
                if(game.status == "Roster Set")
                    assistant.say("Ready to play").data(game.gameState).finish()
                else
                    assistant.say("Ok").data(game.gameState).finish();
            })
            .catch(function(err){
                assistant.error(500).data(err).finish();
            })
    });
}

var validateInput = function(args, assistant){
    if(!args.names || args.names.length == 0)
        return "Didn't get a list of players";
    if(!args.teamName || args.teamName.length == 0)
        return "Didn't get a teamName"

    return null;
}

var RemovePlayersFromTeam = {
    execute: execute,
    validateInput: validateInput,
    logInput: true
}

module.exports = RemovePlayersFromTeam