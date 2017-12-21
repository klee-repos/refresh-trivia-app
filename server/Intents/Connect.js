
var User = require('../models/User');

var Connect = function(res, uniqueUserId, sessionManager) {
    if(!uniqueUserId) {return res.status(400).send()}
    var connectCode = res.result.parameters.connectCode;
    User.findOne({amzUserId:uniqueUserId}, function(err, user) {
        if (!user) {
            var user = new User();
            user.amzUserId = uniqueUserId;
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