var Intents = require('../Intents');
var Promise = require('bluebird')
var ContextMap = require('../ContextMap')
const User = require('../models/User');

var IntentExecutor = function(args, assistantContext){
    var intent = Intents[args.intentName.toUpperCase()];
    validateInput(intent, args, assistantContext).then(function(){
        requireContext(args, assistantContext).then(function(found) {
            if (found) {
                logInput(intent, args, assistantContext)
                intent.execute(args, assistantContext)
            } else {
                assistantContext.say("This command is not active. Please use a command indicated on the screen or say exit to leave trivia.").finish();
            }
        })    
    })
    .catch(function(err){
        console.log("Validation Error: " + err)
        assistantContext.say(err).finish({exit:true});
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
        let requestedIntent = args.intentName;
        let activeIntents = ContextMap[assistant.deviceProfile.user.context].activeIntents;
        for (let i = 0; i < activeIntents.length; i++) {
            if (requestedIntent.toUpperCase() === activeIntents[i].toUpperCase()) {
                found = true;
                break;
            }
        }
        resolve(found)
    })
}

var validateInput = function(intent, args, assistantContext){
    return new Promise(function(resolve, reject){
        if(!intent) return reject("That is not a valid intent");
        if (intent.validateInput && typeof(intent.validateInput) === "function"){
            var validationError = intent.validateInput(args, assistantContext);
            if (validationError){
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