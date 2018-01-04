var Game = require('../../models/Game');
var SessionManager = require('../../SessionManager')

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game)
    .then(function(game){
        game.addPlayersToTeam(args.names, args.teamName)
            .then(function(){
                console.log(game);
                game.save();
                if(game.getStatus() == "Roster Set")
                    assistant.say("Ready to play?").data().finish()
                else
                    assistant.say("Ok").data().finish();
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

var AddPlayersToTeam = {
    execute: execute,
    validateInput: validateInput
}

module.exports = AddPlayersToTeam