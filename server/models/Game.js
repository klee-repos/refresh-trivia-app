var mongoose = require('mongoose');

/* ///////////////////////////////////
// Team
*/ ////////////////////////////////

var teamSchema = mongoose.Schema(
    {
        name: String,
        score: Number,
        bonuses: Number,
        players: [String]
    }
)

teamSchema.methods.isSet = function(){
    return this.players.length > 0;
}

teamSchema.methods.addPlayers = function(names){
    (this.players || []).concat(names)
}

var roundSchema = new mongoose.Schema({

})

/* /////////////////////////////////
// GameState
*/ ///////////////////////////////

var gameStateSchema = new mongoose.Schema(
{
    previousQuestions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question'}],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question'},
    round: roundSchema,
    teams: {
        team1: {type: teamSchema, default:"one"},
        team2: {type: teamSchema, default:"two"},
    },
    status: {
        type: String,
        enum: ["New", "Roster Set", "In Progress", "Finished"],
        required: true
    }
});

gameStateSchema.methods.updateRoster = function(name)
{
    return new Promise(function(resolve,reject){
        name = name.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(name == team1Name)
            resolve(this.teams.team1.addPlayers(names))
        else if(name==team2Name)
            resolve(this.teams.team2.addPlayers(names))
        else
            reject("No team found")
    });
}

gameStateSchema.methods.updateStatus = function()
{
    if (this.team1.isSet() && this.team2.isSet())
        this.status
}

/* /////////////////////////////////
// Game
*/ ////////////////////////////////

var gameSchema = new mongoose.Schema(
{
    began: {type:Date, default:Date.now},
    devices: [{type:String, ref:'Device'}],
    numTeams: {type:Number, default:2},
    numRounds: {type:Number, default: 8},
    gameState: {type:gameStateSchema, default: {status:"New"}}
});

gameSchema.methods.updateRoster = function(names, team){
    console.log(names,team)
    return this.gameState.updateRoster(names, team)
}

gameSchema.methods.getStatus = function(){
    return this.gameState.status;
}


var Game = mongoose.model('Game', gameSchema);

module.exports = Game;