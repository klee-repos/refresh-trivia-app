
var User = require('./models/User');

var Connect = function(result, sessionManager) {
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
            sessionManager.io.to(tmpSession).emit('re-connect', user.sessionCode)
            sessionManager.removeSession(connectCode);
        }
    });
}

module.exports = Connect;