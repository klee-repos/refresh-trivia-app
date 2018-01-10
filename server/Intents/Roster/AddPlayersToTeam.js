const Game = require('../../models/Game');
const SessionManager = require('../../SessionManager')

const forwardURL = 'https://storage.googleapis.com/trivia-df1da.appspot.com/sounds/forward.wav';

var newContext = 'rosterSetup'
var previousContext = 'mainMenu'

var execute = function(args, assistant){
    let user = assistant.deviceProfile.user;
    Game.findById(assistant.deviceProfile.user.game)
    .then(function(game){
        game.addPlayersToTeam(args.names, args.teamName).then(function(){
            game.save();
            var teams = game.getRoster();
            let roster = {
                teamOne: teams.team1.players,
                teamTwo: teams.team2.players,
            }
            SessionManager.sendData(user.sessionCode, 'teamRoster', roster);
            if(game.getStatus() == "Roster Set") {
                newContext = 'readyToStart'
                assistant
                .say('<speak><audio src="' + forwardURL + '"></audio>Added to Team ' + args.teamName + '<desc>. Let me know when you are ready to begin!</desc></speak>')
                .finish()
            } else {
                assistant
                .say('<speak><audio src="' + forwardURL + '"></audio>Added to team ' + args.teamName + '<desc>. Just need one player on the opposing team to start.</desc></speak>')
                .finish()
            }
            ;
            user.setContext(newContext, previousContext);
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