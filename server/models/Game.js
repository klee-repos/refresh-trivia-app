var mongoose = require('mongoose');

var gameStateSchema = new mongoose.Schema(
{
    previousQuestions: [mongoose.Schema.Types.ObjectId],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question'},
    totalScore: [Number],
    roundScore: [Number],
    roundNumber: {type:Number, default:1, required: true, min: 1},
    status: {
        type: String,
        enum: ["New", "In Progress", "Finished"],
        default: "New",
        required: true
    }
})

var gameSchema = new mongoose.Schema(
{
    began: {type:Date, default:Date.now},
    gameId: mongoose.Schema.Types.ObjectId,
    devices: [{type:String, ref:'Device'}],
    numPlayers: {type:Number, default:1},
    numRounds: {type:Number, default: 4},
    gameState: gameStateSchema
});



// gameSchema.methods.formatAnswers = function(answers) {
//     return new Promise(function(resolve, reject) {
//         var answerKey = [];
//         let column = [];
//         let row = 0;
        
//         for (let i = 0; i < answers.length; i++) {
//             column.push(answers[i])
//             if (row === 4) {
//                 answerKey.push(column)
//                 column = [];
//                 row = 0;
//             } else {
//                 row++
//             }
//         }
//         if (column.length > 0) {
//             answerKey.push(column)
//         }
//         resolve(answerKey)
//     })
// }

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;