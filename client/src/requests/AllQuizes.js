const axios = require('axios');
const Promise = require('bluebird');

var quizList = function(){
    return new Promise(function (resolve, reject) {
        axios.get('/mainMenu/allQuizes').then(function(res) {
            resolve(res)
        })
    })
}

var AllQuizes = {
    quizList:quizList
}

export default AllQuizes