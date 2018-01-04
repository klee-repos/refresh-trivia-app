// var SessionManager = require('../SessionManager');

// var execute = function(args, assistant){
//     User.findOne({gAssistantId: args.uniqueUserId})
//         .then(function(user){
//             var currentGame = user.currentGame;
//             GameState.findOne({gameStateId:currentGame})
//                 .then(function(gameState) {
//                     let theQuestion = gameState.questions[parseInt(questionIndex)];
//                     let newAnswers = theQuestion.answersGiven.slice();
//                     let answerKey = theQuestion.answerKey.slice();
//                     let answerIndex;
//                     isAnAnswer(guess, theQuestion.answersFull).then(function(answer) {
//                         if (answer) {
//                             for (let i = 0; i < answerKey.length; i++) {
//                                 if (answerKey[i] === answer.key) {
//                                     answerIndex = i;
//                                     break;
//                                 }
//                             }
//                             newAnswers[answerIndex] = answer.key
//                             gameState.questions[parseInt(questionIndex)].answersGiven = newAnswers;
//                             gameState.markModified('questions');
//                             gameState.save();
//                             result.speech = '<speak><audio src="' + correctURL + '"><desc>' + answer.key + ' is correct!</desc></audio></speak>';
//                             game.formatAnswers(newAnswers).then(function(preparedAnswers) {
//                                 sessionManager.io.emit('correctAnswer', preparedAnswers)
//                             })
//                         } else {
//                             result.speech = '<speak><audio src="' + wrongURL + '"><desc>Incorrect!</desc></audio></speak>'
//                         }
//                         res.send(result);
//                 }).catch(function(err){
//                     assistant.say("There was a problem. Please try your guess again.").finish();
//                 });
                
//             })		
//         })
// }

// var isAnAnswer = function(guess,answers){
//     var answer = null;
//     guess = guess.toLowerCase();
//     answers.some(function(ans){
//         if(ans.key.toLowerCase() === guess){
//             answer = ans;
//             return true;
//         }
//         if(ans.phrasings.some(function(phr){
//             if(phr.toLowerCase() === guess){
//                 answer = ans;
//             }
//         }));
//     });
//     return answer;
// }

// var GuessIntent = {
//     execute: execute
// }

// module.exports = GuessIntent