var Questions = require('../models/Question')

var execute = function(args, assistant){
    var opts1 = {
        previousQuestions: null,
        category: 'Geography',
        // difficulty: 1,
    }

    Questions.getQuestions(opts1).then(function(res){
        var numResults = res.length;
        var rand = Math.floor(Math.random() * (numResults+1))
        console.log(rand)
    })
    .catch(function(err){
        console.log(err)
    })
    assistant.finish();
}

var Test = {
    execute: execute,
    // logInput: true
}

module.exports = Test;