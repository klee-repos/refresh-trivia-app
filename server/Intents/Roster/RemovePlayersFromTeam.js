const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

var newContext = 'rosterSetup'

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game).then(function(game){
        game.removePlayersFromTeam(args.names, args.teamName).then(function(){
            game.save();
            if(game.getStatus() == "Roster Set") {
                newContext = 'readyToStart'
                assistant
                    .say("Ready to play?")
                    .finish()
            } else {
                assistant
                    .say("Ok")
                    .finish()
            }
            user.setContext(newContext, user.getPreviousContext());
            user.save();
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
    validateInput: validateInput
}

module.exports = RemovePlayersFromTeam