var Promise = require('bluebird');
var Intents = require('../Intents');

var UserProvider = require('../models/User');

var executeIntent = function(options){
    //entendHandler with intent requirements
    //execute generic Intent function
    this.options = options;
    var intent = new Intents[options.intent.toUpperCase()](); //gets and instantiates new IntentClass
    if(intent.hasOwnProperty('User')){
        return UserProvider.inject(options, intent).then(intent.execute);
    }
    return intent.execute(options)
}

module.exports = executeIntent;