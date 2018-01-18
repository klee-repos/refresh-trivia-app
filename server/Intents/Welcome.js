
var User = require('../models/User')

var execute = function(args, assistant){
    User.findOne({gAssistantId:args.platformUserId}, function(err, user) {
        let speech = user ? "Welcome back" : "What session would you like to connect to?";
        assistant.say(speech).finish();
    })
}

var WelcomeIntent = {
    execute: execute
}

module.exports = WelcomeIntent;    