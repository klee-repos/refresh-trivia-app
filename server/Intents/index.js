var Intents = {};

Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');
Intents.UPDATEROSTER = require('./AddTeamMembers');
Intents["INPUT.WELCOME"] = require('./Welcome');

module.exports = Intents;