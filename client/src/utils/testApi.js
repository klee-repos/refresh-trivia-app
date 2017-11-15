var axios = require('axios');

module.exports = {

    fetchName: function() {
        return axios.get("http://localhost:8080/test/gavin")
            .then(function(response) {
                return response.data.user;
            }) 
    }
}