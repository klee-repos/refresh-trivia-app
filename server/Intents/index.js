var Intents = {};

Intents.CONNECT = require('./Connect');
Intents.NEWGAME = require('./NewGame');
Intents["INPUT.WELCOME"] = require('./Welcome');

module.exports = Intents;