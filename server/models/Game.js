var mongoose = require('mongoose');

var teamSchema = mongoose.Schema(
    {
        score: Number,
        bonuses: Number,
        players: [String]
    }
)

var roundSchema = mongoose.Schema(
{

})

var gameStateSchema = new mongoose.Schema(
{
    previousQuestions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question'}],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question'},
    round: roundSchema,
    team1: teamSchema,
    team2: teamSchema,
    status: {
        type: String,
        enum: ["New", "In Progress", "Finished"],
        required: true
    }
})

var gameSchema = new mongoose.Schema(
{
    began: {type:Date, default:Date.now},
    gameId: mongoose.Schema.Types.ObjectId,
    devices: [{type:String, ref:'Device'}],
    numTeams: {type:Number, default:2},
    numRounds: {type:Number, default: 4},
    gameState: {type:gameStateSchema, default: {status:"New"}}
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;