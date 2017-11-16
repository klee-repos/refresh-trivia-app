var axios = require('axios');

module.exports = {

    fetchName: function() {
        return axios.get("/test/gavin")
            .then(function(response) {
                return response.data.user;
            }) 
    }
}