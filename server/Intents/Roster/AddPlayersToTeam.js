const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

const requiredContext = ['newGame']

var execute = function(args, assistant){
    Game.findById(assistant.deviceProfile.user.game)
    .then(function(game){
        let found = false;
        game.requireContext(requiredContext).then(function(found) {
            if(found) {
                game.addPlayersToTeam(args.names, args.teamName).then(function(){
                    game.save();
                    if(game.getStatus() == "Roster Set")
                        assistant.say("Ready to play?").finish()
                    else
                        assistant.say("Ok").finish();
                })
                .catch(function(err){
                    assistant.error(500).data(err).finish();
                })
            } else {
                assistant.say("Sorry this command isn't available.").finish();
                game.save();
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

var AddPlayersToTeam = {
    execute: execute,
    validateInput: validateInput
}

module.exports = AddPlayersToTeam