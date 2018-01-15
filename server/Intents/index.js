var Intents = {};

Intents["INPUT.WELCOME"] = require('./Welcome');

//Menu
Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');
Intents.GOBACK = require('./GoBack')

//Guess
Intents.GUESS = require('./Guess')

//Roster
Intents.ADDPLAYERSTOTEAM = require('./Roster/AddPlayersToTeam');
Intents.REMOVEPLAYERSFROMTEAM = require('./Roster/RemovePlayersFromTeam');
Intents.CONFIRMROSTER = require('./Roster/ConfirmRoster');

Intents.TEST = require('./Test');

module.exports = Intents;