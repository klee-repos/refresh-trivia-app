
var execute = function(args, assistant){
    console.log('hit')
    let speech = 'Good bye'
    assistant.say(speech).finish();
}

var ExitIntent = {
    execute: execute
}

module.exports = ExitIntent;    