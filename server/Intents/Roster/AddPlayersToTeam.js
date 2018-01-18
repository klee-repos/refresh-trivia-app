const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')

var newContext = 'rosterSetup'
const ContextMap = require('../../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game)
        .then(function(game){
            game.addPlayersToTeam(args.names, args.teamName).then(function(){
                game.save();
                SessionManager.sendData(user.sessionCode, 'teamRoster', game.formatRoster());
                if(game.getStatus() == "Roster Set") {
                    newContext = 'readyToStart'
                    assistant
                        .play(Sounds.forward)
                        .say("Confirm roster to start the game!")
                        .finish()
                } else {
                    assistant
                        .play(Sounds.forward)
                        .say("Added")
                        .finish()
                }
                user.setContext(newContext, ContextMap[newContext].previous);
                SessionManager.sendData(user.sessionCode, 'setStatus', newContext);
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

var AddPlayersToTeam = {
    execute: execute,
    validateInput: validateInput
}

module.exports = AddPlayersToTeam