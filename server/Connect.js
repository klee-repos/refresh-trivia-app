
var User = require('./models/User');

var sessionManager = require('./sessionManager');

var Connect = function(result) {
    var amzId = "123sdfssdsdddfs45";
    if(!amzId) {return res.status(400).send()}
    var connectCode = result.parameters.fields.connectCode.numberValue;
    User.findOne({amzUserId:amzId}, function(err, user) {
        if (!user) {
            var user = new User();
            user.amzUserId = amzId;
            user.sessionCode = User.generateSessionCode();
            user.save();
        }
        if(sessionManager.getSession(connectCode)){
            var tmpSession = sessionManager.getSession(connectCode);
            sessionManager.emitDataToRoom(tmpSession, 're-connect', user.sessionCode)
            sessionManager.removeSession(connectCode);
        }
    });
}

module.exports = Connect;