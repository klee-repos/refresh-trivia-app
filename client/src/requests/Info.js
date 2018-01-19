const axios = require('axios');

var getRoster = function(sessionCode){
    axios.post('/info/getRoster', {
        sessionCode: sessionCode,
    })
}

var getRound = function(sessionCode) {
    axios.post('/info/getRound', {
        sessionCode: sessionCode
    })
}

// var getQuestion = function(sessionCode) {
//     axios.post('/info/getQuestion', {
//         sessionCode: sessionCode
//     })
// }

var Info = {
    getRoster:getRoster,
    getRound: getRound,
    // getQuestion: getQuestion
}

export default Info