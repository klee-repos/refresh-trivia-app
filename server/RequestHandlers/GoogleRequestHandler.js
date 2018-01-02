var RequestHandler = require('./BaseRequestHandler');

var GoogleRequestHandler = function(googleArgs, res){
    //parse googleArgs -> generic args
    var gId = googleArgs.originalRequest.data.user.userId;
    var args = googleArgs.result.parameters;
    var responseHandler = new GoogleResponseHandler(res);
    return new RequestHandler({
        uniqueUserId: gId,
        intent: googleArgs.result.action,
        args: args
    }, responseHandler);
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