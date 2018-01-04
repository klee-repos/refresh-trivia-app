var IntentExecution = require('./IntentExecutor');

var GoogleAssistant = function(googleArgs, _res){
    var res = _res;
    var responseData = {
        speech: "",
        displayText: "",
        data: {"google":{"is_ssml":true}},
        contextOut: [],
        source: "",
        followupEvent: {}
    };

    var resStatus = 200;

    this.say = function(speech){
        responseData.speech += speech;
        return this;
    }

    this.data = function(_data){
        responseData.data = _data;
        return this;
    }

    this.error = function(errorCode){
        resStatus = errorCode;
        return this;
    }

    this.finish = function(){
        console.log(resStatus)
        res.status(resStatus || 200).send(responseData);
    }

    //Automatically execute
    var context = googleArgs.result.parameters;
    context.uniqueUserId = googleArgs.originalRequest.data.user.userId;
    context.intent = googleArgs.result.action
    new IntentExecution(context, this);
}

module.exports = GoogleAssistant;