const axios = require('axios');

var today = function(lat,long){
    return axios.get('/apps/weather/forecast/today?' + 'lat=' + lat + '&long=' + long);
}

module.exports = {
    today: today
}