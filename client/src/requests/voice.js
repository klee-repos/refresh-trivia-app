const axios = require('axios');

var voiceInput = function(data, code){
    var sessionCode = '';
    if (code) {
        sessionCode = code;
    }
    return axios.post('/voice', {
        voice: data,
        sessionCode: sessionCode
    })
}

var VoiceRequests = {
    voiceInput:voiceInput
}

export default VoiceRequests