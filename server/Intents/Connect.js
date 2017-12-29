
var User = require('../models/User');

var Connect = function(res, result, uniqueUserId, connectCode, sessionManager) {
    if(!uniqueUserId) {return res.status(400).send()}
    console.log(uniqueUserId);
    console.log(connectCode)
    User.findOne({gAssistantId:uniqueUserId}, function(err, user) {
        if (!user) {
            var user = new User();
            user.gAssistantId = uniqueUserId;
            user.sessionCode = User.generateSessionCode();
            user.save();
        }
        if(sessionManager.getSession(connectCode)){
            sessionManager.io.to(sessionManager.getSession(connectCode)).emit('re-connect', user.sessionCode);
            sessionManager.removeSession(connectCode);
        }
        res.send(result)
    });
}

// User.findOne({gAssistantId:gId}, function(err, user) {
//     if (!user) {
//         var user = new User();
//         user.gAssistantId = gId;
//         user.sessionCode = User.generateSessionCode();
//         user.save();
//     }
//     if(sessionManager.getSession(connectCode)){
//         io.to(sessionManager.getSession(connectCode)).emit('re-connect', user.sessionCode);
//         sessionManager.removeSession(connectCode);
//     }
//     res.send(result);

module.exports = Connect;