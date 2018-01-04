var Intents = require('../Intents');

var IntentExecutor = function(args, assistantContext){
    var intent = Intents[args.intent.toUpperCase()];
    //Validate the intent input if a validator exists
    if (intent.validateInput && typeof(intent.validateInput) === "function"){
        var validationError = intent.validateInput(args, assistantContext);
        if (validationError)
            assistantContext.say("Theres an error").error(500).data(validationError).finish();
        else {
            intent.execute(args, assistantContext);
        }
    }else{
        intent.execute(args, assistantContext);
    }
}



module.exports = IntentExecutor;