const axios = require('axios');


var today = function(lat,long){
    if(!lat) return;
    return axios.get('/apps/weather/forecast/today?' + 'lat=' + lat + '&long=' + long);
}

module.exports = {
    today: today
}