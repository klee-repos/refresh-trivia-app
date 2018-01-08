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
    return this.players
}

teamSchema.methods.removePlayers = function(names){
    this.players = _.difference(this.players || [],names)   
    this.markModified('players')
    return this.players
}

var roundSchema = new mongoose.Schema({

})

/* /////////////////////////////////
// Context
*/ ///////////////////////////////

var contextSchema = mongoose.Schema(
    {
        name: String,
        lifespan: Number
    }
)

/* /////////////////////////////////
// GameState
*/ ///////////////////////////////

var gameStateSchema = new mongoose.Schema(
{
    previousQuestions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question', default: []} ],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question', default:null},
    round: roundSchema,
    teams: {
        team1: {type: teamSchema, default:{name:"one", players: []}},
        team2: {type: teamSchema, default:{name:"two", players: []}},
    },
    status: {
        type: String,
        enum: ["New", "Roster Set", "In Progress", "Finished"],
        required: true
    },
    contexts: [{type:contextSchema, default:null}]
});

gameStateSchema.methods.addPlayersToTeam = function(names, teamName)
{
    return new Promise(function(resolve,reject){
        teamName = teamName.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(teamName == team1Name){
            this.teams.team1.addPlayers(names)
            this.updateStatus()
            resolve();
        }
        else if(teamName==team2Name){
            this.teams.team2.addPlayers(names)
            this.updateStatus()
            resolve();
        }
        else
            return reject("No team found")
    }.bind(this));
}

gameStateSchema.methods.removePlayersFromTeam = function(names, teamName)
{
    return new Promise(function(resolve,reject){
        teamName = teamName.toUpperCase();
        var team1Name = this.teams.team1.name.toUpperCase();
        var team2Name = this.teams.team2.name.toUpperCase();
        if(teamName == team1Name){
            this.teams.team1.removePlayers(names)
            this.updateStatus()
            resolve();
        }
        else if(teamName==team2Name){
            this.teams.team2.removePlayers(names)
            this.updateStatus()
            resolve();
        }
        else
            return reject("No team found")
    }.bind(this));
}

gameStateSchema.methods.updateStatus = function()
{
    if (this.teams.team1.isSet() && this.teams.team2.isSet()){
        this.status = "Roster Set"
    }
}

gameStateSchema.methods.createContext = function(name, lifespan) {
    let context = {
        name: name,
        lifespan: lifespan
    }
    this.contexts.push(context)
    return this.contexts 
}

gameStateSchema.methods.requireContext = function(contextNames) {
    return new Promise(function(resolve,reject) {
        let requiredContext=contextNames.slice();
        let found = false;
        for (let i = 0; i < requiredContext.length; i++) {
            for (let j = 0; j < this.contexts.length; j++) {
                if (this.contexts[j].name === requiredContext[i]) {
                    requiredContext.splice(i,1)
                    this.contexts[j].lifespan -= 1;
                }
            }
            if (requiredContext.length === 0) {
                found = true;
            }
        }
        for (let k = 0; k < this.contexts.length; k++) {
            if (this.contexts[k].lifespan === 0 ) {
                this.contexts.splice(k,1)
            }
        }
        resolve(found)
    }.bind(this))
}

/* /////////////////////////////////
// Game
*/ ////////////////////////////////

var gameSchema = new mongoose.Schema(
{
    began: {type:Date, default:Date.now},
    devices: [{type:String, ref:'Device'}],
    gameState: {type:gameStateSchema, default: {status:"New"}}
});

gameSchema.methods.addPlayersToTeam = function(names, team){
    return this.gameState.addPlayersToTeam(names, team);
}

gameSchema.methods.removePlayersFromTeam = function(names, team){
    return this.gameState.removePlayersFromTeam(names, team);
}

gameSchema.methods.getStatus = function(){
    return this.gameState.status;
}

gameSchema.methods.getRoster = function(){
    return this.gameState.teams;
}

gameSchema.methods.getTeams = function(){
    return {
        team1: this.gameState.teams.team1.players,
        team2: this.gameState.teams.team2.players
    }
}

gameSchema.methods.createContext = function(name, lifespan) {
    return this.gameState.createContext(name, lifespan);
}

gameSchema.methods.requireContext = function(contextNames) {
    return this.gameState.requireContext(contextNames);
}


var Game = mongoose.model('Game', gameSchema);

module.exports = Game;