var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema(
    {
        correctValue: String,
        phrasings: [String]
    }
)

var questionSchema = new mongoose.Schema(
    {
        text: String,
        id: mongoose.Schema.Types.ObjectId,
        answers: [answerSchema]
    }
)

questionSchema.methods.isAnAnswer = function(guess){
    return new Promise(function(resolve,reject) {
        var answer = null;
        guess = guess.toLowerCase();
        this.answers.some(function(ans){
            if(ans.key.toLowerCase() === guess){
                answer = ans;
                resolve(answer);
            }
            if(ans.phrasings.some(function(phr){
                if(phr.toLowerCase() === guess){
                    answer = ans;
                    resolve(answer);
                }
            }));
        });
        resolve(answer);
    })   
}