var Intents = {};

Intents["INPUT.WELCOME"] = require('./Welcome');

//Menu
Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');
Intents.GOBACK = require('./GoBack')

//Roster
Intents.ADDPLAYERSTOTEAM = require('./Roster/AddPlayersToTeam');
Intents.REMOVEPLAYERSFROMTEAM = require('./Roster/RemovePlayersFromTeam');
Intents.CONFIRMROSTER = require('./Roster/ConfirmRoster');

module.exports = Intents;