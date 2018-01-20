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

questionSchema.statics.getRandomQuestion = function(opts){
    // opts.excludedQuestions
    // opts.category
    // opts.difficulty
    // opts.limit

    return new Promise (function(resolve, reject){
        var query = this.find()
        if(opts){
            if(opts.category)
                query = query.where('category').equals(opts.category);
    
            if(opts.difficulty)
                query = query.where('difficulty').equals(opts.difficulty)
    
            if(opts.excludedQuestions)
                query = query.where('id').nin(opts.excludedQuestions) 
    
            query.exec()
                .then(function(questions){
                    if(!questions || questions.length == 0) {reject("No questions found")}
                    else{
                        var numResults = questions.length;
                        var rand = Math.floor(Math.random() * (numResults))
                        console.log('hit')
                        console.log('rand: ' + rand)
                        console.log('question: ' + questions[rand])
                        resolve(questions[rand])
                    }
            })
        }
    }.bind(this))
}


//Randomizer
var Question = mongoose.model('Question', questionSchema);

module.exports = Question;