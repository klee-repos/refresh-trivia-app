var Promise = require('bluebird');

function ConnectIntent(){
    this.User = null;
    this.SessionManager = null;
}

ConnectIntent.prototype.execute = function(args){
    return new Promise(function(resolve,reject){
        resolve(args);
        // if(sessionManager.getSession(connectCode)){
        //     sessionManager.io.to(sessionManager.getSession(connectCode)).emit('re-connect', user.sessionCode);
        //     sessionManager.removeSession(connectCode);
        // }
    });
}

// var Connect = function(res, result, uniqueUserId, connectCode) {
//     if(!uniqueUserId) {return res.status(400).send()}
//     // console.log(uniqueUserId);
//     // console.log(connectCode);
//     User.findOne({gAssistantId:uniqueUserId}, function(err, user) {
//         if (!user) {
//             var user = new User();
//             user.gAssistantId = uniqueUserId;
//             user.sessionCode = User.generateSessionCode();
//             user.save();
//         }
//         if(sessionManager.getSession(connectCode)){
//             sessionManager.io.to(sessionManager.getSession(connectCode)).emit('re-connect', user.sessionCode);
//             sessionManager.removeSession(connectCode);
//         }
//         res.send(result)
//     });
// }


module.exports = ConnectIntent;