const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

const Sounds = require('../../Sounds')

var newContext = 'rosterSetup'
const ContextMap = require('../../ContextMap')

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game).then(function(game){
        game.removePlayersFromTeam(args.names, args.teamName).then(function(){
            game.save();
            SessionManager.sendData(user.sessionCode, 'teamRoster', game.formatRoster());
            if(game.getStatus() == "Roster Set") {
                newContext = 'readyToStart'
                assistant
                .say('<speak><audio src="' + Sounds.backward + '"></audio>Removed<desc>. Confirm roster to start the game!</desc></speak>')
                .finish()
            } else {
                assistant
                .say('<speak><audio src="' + Sounds.backward + '"></audio>Removed<desc>. One additional player required on the opposing team to start.</desc></speak>')
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

var RemovePlayersFromTeam = {
    execute: execute,
    validateInput: validateInput
}

module.exports = RemovePlayersFromTeam