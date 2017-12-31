const axios = require('axios');
const Promise = require('bluebird');

var answersList = function(){
    return new Promise(function (resolve, reject) {
        axios.get('/mainMenu/allAnswers').then(function(res) {
            resolve(res)
        })
    })
}

var AllAnswers = {
    answersList:answersList
}

export default AllAnswers