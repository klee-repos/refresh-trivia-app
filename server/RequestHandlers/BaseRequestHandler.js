var Promise = require('bluebird');
var Intents = require('../Intents');

var UserProvider = require('../models/User');

var executeIntent = function(options){
    //entendHandler with intent requirements
    //execute generic Intent function
    this.options = options;
    var intent = new intentClass();
    return intent.execute(options)
}

var intentClass = function(){
    return Intents[options.intent.toUpperCase()]
}

module.exports = executeIntent;