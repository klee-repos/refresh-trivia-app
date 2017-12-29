const axios = require('axios');
const Promise = require('bluebird');

var gamesList = function(){
    return new Promise(function (resolve, reject) {
        axios.get('/games').then(function(res) {
            resolve(res)
        })
    })
}

var Games = {
    gamesList:gamesList
}

export default Games