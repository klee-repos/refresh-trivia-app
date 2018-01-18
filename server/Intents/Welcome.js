
var User = require('../models/User')

var execute = function(args, assistant){
    User.findOne({gAssistantId:args.platformUserId}, function(err, user) {
        let speech;
        if (!user) {
            speech = "<speak>What session would you like to connect to?</speak>"
        } else {
            speech = "<speak>Welcome back</speak>"
        }
        assistant.say(speech).finish();
    })
}

var WelcomeIntent = {
    execute: execute
}

module.exports = WelcomeIntent;    