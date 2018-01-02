var Promise = require('bluebird');
var Intents = require('../Intents');

var executeIntent = function(options, responseHandler){
    var intent = Intents[options.intent.toUpperCase()];
    return intent.execute(options, responseHandler.respond, responseHandler.fail);
}

module.exports = executeIntent;