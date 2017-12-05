const axios = require('axios');


var today = function(lat,long){
    if(!lat) return;
    console.log(axios.defaults.headers)
    return axios.get('/apps/weather/forecast/today?' + 'lat=' + lat + '&long=' + long);
}

module.exports = {
    today: today
}