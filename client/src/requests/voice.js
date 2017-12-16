const axios = require('axios');

var voiceInput = function(data){
    return axios.post('/voice', {
        voice: data
    })
}

var VoiceRequests = {
    voiceInput:voiceInput
}

export default VoiceRequests