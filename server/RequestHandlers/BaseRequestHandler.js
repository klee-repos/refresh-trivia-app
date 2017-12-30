var Promise = require('bluebird');
var Intents = require('../Intents');

var executeIntent = function(baseArgs){
    return new Promise(function(resolve,reject){
        //entendHandler with intent requirements
        //execute generic Intent function
        var intent = Intents[baseArgs.intentName];
        intent(baseArgs).then(resolve()).catch();
    })
}

var BaseRequestParser = function(options){
    this.options = options;
}
BaseRequestParser.prototype.executeIntent = executeIntent
BaseRequestParser.prototype.testFunction = function(){console.log("here")}

module.exports = BaseRequestParser