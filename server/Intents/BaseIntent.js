var getBaseArgs = function(){
    return {
        "uniqueUserId": {
            "platform": null,
            "id": null
        },
        "intentName": null,
        
}

var errors = {
    "MissingUniqueId": "MissingUniqueId"
}

var Intents = require('./index.js')


var GoogleIntent = function(googleArgs){
    //parse googleArgs -> generic args

    var dialogflowResponse = function(){
        return {
            speech: "",
            displayText: "",
            data: {},
            contextOut: [],
            source: "",
            followupEvent: {}
        }
    }

    var parseArgs = function(){
        var baseArgs = getBaseArgs();
        var intent = googleArgs.result.action;
        var result = dialogflowResponse();
        var gId = googleArgs.originalRequest.data.user.userId;
    }
}

var BaseIntent = function(baseArgs){

}

