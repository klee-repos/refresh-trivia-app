var Intents = require('../Intents');

var IntentExecutor = function(context, assistantContext){
    var intent = Intents[context.intent.toUpperCase()];
    //Validate the intent input if a validator exists
    if (intent.validateInput && typeof(intent.validateInput) === "function"){
        var validationError = intent.validateInput(context);
        if (validationError)
            assistantContext.say("Theres an error").error(500).data(validationError).finish();
        else {
            intent.execute(context, assistantContext);
        }
    }else{
        intent.execute(context, assistantContext);
    }
}



module.exports = IntentExecutor;