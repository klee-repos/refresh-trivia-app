var Intents = require('../Intents');
var Promise = require('bluebird')

var IntentExecutor = function(args, assistantContext){
    var intent = Intents[args.intent.toUpperCase()];
    validateInput(intent, args, assistantContext)
        .then(function(){
            logInput(intent, args, assistantContext)
            intent.execute(args, assistantContext)
        })
        .catch(function(err){
            console.log(err)
        })
}

var logInput = function(intent,args, assistantContext){
    if(!intent.logInput) return;
    
    console.log(args);
    console.log(assistantContext);
    return
}


var validateInput = function(intent, args, assistantContext){
    return new Promise(function(resolve, reject){
        if (intent.validateInput && typeof(intent.validateInput) === "function"){
            var validationError = intent.validateInput(args, assistantContext);
            if (validationError){
                assistantContext.say("Theres an error").error(500).data(validationError).finish();
                reject(validationError)                
            } else {
                resolve();
            }
        } else {
            resolve();
        }
    });
}


module.exports = IntentExecutor;