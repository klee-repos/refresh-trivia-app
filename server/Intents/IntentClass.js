var userProvider = require('../models/User');

var IntentClass = (function(){
    var _user = null;
    var _sessionManager = null;

    var getUser = function(){
        if(_user) return _user;
        else {
            userProvider.findOne({uniqueUserId: this.uniqueUserId})
        }
    }

    return {
        user: getUser,
        sessionManager: getSessionManager
    }
})();