var IntentExecution = require('./IntentExecuter');

var GoogleRequestHandler = function(googleArgs, res){
    //parse googleArgs -> generic args
    var args = googleArgs.result.parameters;
    args.uniqueUserId = googleArgs.originalRequest.data.user.userId;
    args.intent = googleArgs.result.action
    return new IntentExecution(args, new GoogleResponseHandler(res));
}

var GoogleResponseHandler = function(res){
    this.respond = function(speech,data){
        var response = emptyResponse();
        response.speech = speech;
        response.data = data;
        res.status(200).send(response);
    }

    this.fail = function(speech,error){
        var response = emptyResponse();
        response.speech = speech;
        response.data = error;
        res.status(500).send(response);
    }
}

var emptyResponse = function(){
    return {
        speech: "",
        displayText: "",
        data: {},
        contextOut: [],
        source: "",
        followupEvent: {}
    }
}

module.exports = GoogleRequestHandler;