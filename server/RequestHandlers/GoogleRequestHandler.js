var RequestHandler = require('./BaseRequestHandler');

var GoogleRequestHandler = function(googleArgs){
    //parse googleArgs -> generic args
    var gId = googleArgs.originalRequest.data.user.userId;
    return new RequestHandler({
        uniqueUserId: gId,
        intent: googleArgs.result.action,
    });
}

module.exports = GoogleRequestHandler;