var Intents = {};

Intents["INPUT.WELCOME"] = require('./Welcome');

//Menu
Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');

//Roster
Intents.ADDPLAYERSTOTEAM = require('./Roster/AddPlayersToTeam');
Intents.REMOVEPLAYERSFROMTEAM = require('./Roster/RemovePlayersFromTeam');

module.exports = Intents;