const axios = require('axios');

var getRoster = function(sessionCode){
    axios.post('/roster/getRoster', {
        sessionCode: sessionCode,
    })
}

var Roster = {
    getRoster:getRoster
}

export default Roster