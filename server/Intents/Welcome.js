
var User = require('../models/User')
var ContextMap = require('../ContextMap')
var execute = function(args, assistant){
    User.findOne({gAssistantId:args.platformUserId}, function(err, user) {

        let speech, repromptSpeech;
        
        if (!user) {
            speech = "Welcome to Refresh Trivia, a voice and web based trivia game. Please tell me your connect code to continue. If you don't have a connect code, please visit trivia.refreshlabs.co"
            repromptSpeech = "Please tell me your connect code to continue. If you do not have a connect code, please visit trivia.refreshlabs.co"
        } else {
            speech = "Welcome back"
            repromptSpeech = "Welcome back"
            if(ContextMap[user.context].activeIntents.includes("guess")){
                assistant.setContext('guess', 1)
            }
        }
        assistant.say(speech).reprompt.say(repromptSpeech).finish();
    })
}

var WelcomeIntent = {
    execute: execute
}

module.exports = WelcomeIntent;    