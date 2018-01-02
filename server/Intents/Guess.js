var SessionManager = require('../SessionManager');

var execute = function(args, resolve, reject){
        console.log(args)
        var guess = args.guess;
		var quiz = quizes[currentGame];
		var answers = quiz.questions[0].answers;
		var answer = isAnAnswer(guess,answers);
		if (answer) {
			SessionManager.sendData('correctAnswer', answer.key)
			result.speech = answer.key + " is a correct guess!"
		} else {
			result.speech = "Not a correct guess!"
		}
		result.contextOut = [{"name":"game", "lifespan":3, "parameters":{'turns':5}}]; 
		res.send(result);
}

var isAnAnswer = function(guess,answers){
    var answer = null;
    guess = guess.toLowerCase();
    answers.some(function(ans){
        if(ans.key.toLowerCase() === guess){
            answer = ans;
            return true;
        }
        if(ans.phrasings.some(function(phr){
            if(phr.toLowerCase() === guess){
                answer = ans;
            }
        }));
    });
    return answer;
}

var GuessIntent = {
    execute: execute
}

module.exports = GuessIntent