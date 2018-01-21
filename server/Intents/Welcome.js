
var User = require('../models/User')

var execute = function(args, assistant){
    User.findOne({gAssistantId:args.platformUserId}, function(err, user) {
        let speech;
        if (!user) {
            speech = "What session would you like to connect to?"
        } else {
            speech = "Welcome back"
        }
        assistant.say(speech).finish();
    })
}

var WelcomeIntent = {
    execute: execute
}

module.exports = WelcomeIntent;    