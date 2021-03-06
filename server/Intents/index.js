var Intents = {};

Intents["INPUT.WELCOME"] = require('./Welcome');

//Menu
Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');
Intents.GOBACK = require('./GoBack')
Intents.GOTO = require('./GoTo')

// Correct guess
Intents.GUESS = require('./Round/Guess')
Intents.PLAY = require('./Round/Play')
Intents.BANK = require('./Round/Bank')

//Roster
Intents.ADDPLAYERSTOTEAM = require('./Roster/AddPlayersToTeam');
Intents.REMOVEPLAYERSFROMTEAM = require('./Roster/RemovePlayersFromTeam');
Intents.CONFIRMROSTER = require('./Roster/ConfirmRoster');

// exit
Intents.EXIT = require('./Exit')

module.exports = Intents;

