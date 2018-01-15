var Intents = require('../Intents');
var Promise = require('bluebird')

const User = require('../models/User');

var IntentExecutor = function(args, assistantContext){
    var intent = Intents[args.intent.toUpperCase()];
    validateInput(intent, args, assistantContext).then(function(){
        requireContext(args, assistantContext).then(function(found) {
            if (found) {
                logInput(intent, args, assistantContext)
                intent.execute(args, assistantContext)
            } else {
                assistantContext.say("This command is not active").error(500).finish();
            }
        })    
    })
    .catch(function(err){
        console.log(err)
    })
}

var logInput = function(intent, args, assistantContext){
    if(!intent.logInput) return;
    console.log(args);
    console.log(assistantContext);
    return
}

var requireContext = function(args, assistant) {
    return new Promise(function(resolve,reject) {
        let found = false;
        // For the first connect when user object does not exist
        if (!assistant.deviceProfile.user) {
            resolve(true)
        }
        let requestedIntent = args.intent;
        let activeIntents = assistant.deviceProfile.user.context.activeIntents;
        console.log(requestedIntent);
        console.log(activeIntents)
        for (let i = 0; i < activeIntents.length; i++) {
            if (requestedIntent === activeIntents[i]) {
                found = true;
                break;
            }
        }
        resolve(found)
    })
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