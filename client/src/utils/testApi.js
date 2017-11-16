var axios = require('axios');

var test_uri = process.env.TEST_URI + '/test/gavin' || 'http://localhost:8080/test/gavin';

module.exports = {

    fetchName: function() {
        return axios.get(test_uri)
            .then(function(response) {
                return response.data.user;
            }) 
    }
}