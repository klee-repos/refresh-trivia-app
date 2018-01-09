const axios = require('axios');

var getRoster = function(sessionCode){
    axios.post('/info/getRoster', {
        sessionCode: sessionCode,
    })
}

var getContext = function(sessionCode) {
    axios.post('/info/getContext', {
        sessionCode: sessionCode,
    })
}

var Info = {
    getRoster:getRoster,
    getContext: getContext
}

export default Info