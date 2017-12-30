var RequestHandler = require('./BaseRequestHandler');



var GoogleRequestHandler = function(googleArgs){
    return new Promise(function(resolve, reject){
        //parse googleArgs -> generic args
        var gId = googleArgs.originalRequest.data.user.userId;
        new RequestHandler({
            uniqueUserId: gId,
            intent: googleArgs.result.action,
        }).testFunction();
    })
}

var GoogleResponseHandler = function(){

}

module.exports = GoogleRequestHandler;