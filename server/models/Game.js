var mongoose = require('mongoose');
var _ = require('lodash')
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
    this.players = (this.players || []).concat(names);
    this.markModified('players')
    
}

teamSchema.methods.removePlayers = function(names){
    this.players = _.difference(this.players, names);
    this.markModified('players')
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

gameStateSchema.methods.addPlayersToTeam = function(names, teamName)
{
    return new Promise(function(resolve,reject){
        teamName = teamName.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(teamName == team1Name){
            this.teams.team1.addPlayers(names);
            this.updateStatus();
            resolve();            
        }
        else if(teamName==team2Name)
        {
            this.teams.team2.addPlayers(names)
            this.updateStatus();
            resolve();
        }
        else
            reject("No team found")
    }.bind(this));
}

gameStateSchema.methods.removePlayersFromTeam = function(names, teamName)
{
    return new Promise(function(resolve,reject){
        teamName = teamName.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(teamName == team1Name){
            this.teams.team1.removePlayers(names);
            this.updateStatus();
            resolve();            
        }
        else if(teamName==team2Name)
        {
            this.teams.team2.removePlayers(names)
            this.updateStatus();
            resolve();
        }
        else
            reject("No team found")
    }.bind(this));
}

gameStateSchema.methods.updateStatus = function()
{
    this.status = "New";
     if (this.teams.team1.isSet() && this.teams.team2.isSet()){
        this.status = "Roster Set";
     }
     this.markModified('status')
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

gameSchema.methods.addPlayersToTeam = function(names, team){
    return this.gameState.addPlayersToTeam(names, team);
}

gameSchema.methods.removePlayersFromTeam = function(names, team){
    return this.gameState.removePlayersFromTeam(names,team)
}

gameSchema.methods.getStatus = function(){
    return this.gameState.status;
}


var Game = mongoose.model('Game', gameSchema);

module.exports = Game;