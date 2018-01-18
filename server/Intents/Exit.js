
var execute = function(args, assistant){
    let speech = '<speak>Good bye</speak>'
    assistant.say(speech).finish();
}

var WelcomeIntent = {
    execute: execute
}

module.exports = WelcomeIntent;    