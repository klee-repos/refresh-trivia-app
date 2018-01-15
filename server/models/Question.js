var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema(
    {
        correctValue: String,
        phrasings: [String]
    }
)

var questionSchema = new mongoose.Schema(
    {
        qId: Number,
        text: String,
        picklist: Array,
        answer: String,
        category: String,
        difficulty: Number,
        tags: Array,
        mediaURL: String,
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

questionSchema.statics.getQuestion = function(opts){
    // opts.excludedQuestions
    // opts.category
    // opts.difficulty
    var query = this.find();

    if(opts.category)
        query = query.where('category').equals(opts.category);

    if(opts.difficulty)
        query = query.where('difficulty').equals(opts.difficulty)

    if(opts.excludedQuestions)
        query = query.where('id').nin(opts.excludedQuestions)

    return query.execute();
}

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;