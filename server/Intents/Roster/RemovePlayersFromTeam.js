const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

const requiredContext = ['newGame']

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game)
    .then(function(game){
        game.requireContext(requiredContext)
        .then(function(found) {
            if (found) {
                game.removePlayersFromTeam(args.names, args.teamName)
                .then(function(){
                    game.save();
                    console.log(game.getTeamOne())
                    if(game.getStatus() == "Roster Set")
                        assistant.say("Ready to play?").data(game.getRoster()).finish()
                    else
                        assistant.say("Ok").data(game.getRoster()).finish();
                })
                .catch(function(err){
                    assistant.error(500).data(err).finish();
                })
            }
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
    validateInput: validateInput
}

module.exports = RemovePlayersFromTeam