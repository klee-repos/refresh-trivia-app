const axios = require('axios');

var voiceInput = function(data, code, userId){
    var sessionCode = '';
    if (code) {
        sessionCode = code;
    }
    return axios.post('/voice', {
        voice: data,
        sessionCode: sessionCode,
        userId: userId
    })
}

var VoiceRequests = {
    voiceInput:voiceInput
}

export default VoiceRequests