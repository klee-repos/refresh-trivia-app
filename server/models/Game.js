var mongoose = require('mongoose');

/* ///////////////////////////////////
// Team
*/ ////////////////////////////////

var teamSchema = mongoose.Schema(
    {
        name: String,
        score: {type:Number, default:0},
        bonuses: {type:Number, default:0},
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
    previousQuestions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question', default: []} ],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question', default:null},
    round: roundSchema,
    teams: {
        team1: {type: teamSchema, default:{name:"one"}},
        team2: {type: teamSchema, default:{name:"two"}},
    },
    status: {
        type: String,
        enum: ["New", "Roster Set", "In Progress", "Finished"],
        required: true
    }
});

gameStateSchema.methods.updateRoster = function(names, teamName)
{
    return new Promise(function(resolve,reject){
        teamName = teamName.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(name == team1Name){
            this.markModified('teams')
            resolve(this.teams.team1.addPlayers(names))
        } 
        else if(name==team2Name){
            this.markModified('teams')
            resolve(this.teams.team2.addPlayers(names))
        } 
        else
            reject("No team found")
    });
}

gameStateSchema.methods.updateStatus = function()
{
    if (this.team1.isSet() && this.team2.isSet()){

    }
        this.status = "Roster Set"
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
    return this.gameState.updateRoster(names, team)
}

gameSchema.methods.getStatus = function(){
    return this.gameState.status;
}


var Game = mongoose.model('Game', gameSchema);

module.exports = Game;