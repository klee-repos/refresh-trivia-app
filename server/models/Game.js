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
        players: [String],
        playerIndex: {type:Number, default:0},
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

teamSchema.methods.resetTeamOneScore = function() {
    this.score = 0;
    this.markModified('score')
}

teamSchema.methods.resetTeamTwoScore = function() {
    this.score = 0;
    this.markModified('score')
}


/* /////////////////////////////////
// Round
*/ ///////////////////////////////

var roundSchema = new mongoose.Schema({
    round: Number,
    activeTeam: String,
    playerIndex: Number,
    questionIndex: Number,
})



/* /////////////////////////////////
// GameState
*/ ///////////////////////////////

var gameStateSchema = new mongoose.Schema(
{
    previousQuestions: [{type:mongoose.Schema.Types.ObjectId, ref:'Question', default: []} ],
    nextQuestion: {type: mongoose.Schema.Types.ObjectId, ref:'Question', default:null},
    round: {type:roundSchema, default: null},
    teams: {
        team1: {type: teamSchema, default:{name:"one", players: []}},
        team2: {type: teamSchema, default:{name:"two", players: []}},
    },
    status: {
        type: String,
        enum: ["New", "Roster Set", "In Progress", "Finished"],
        required: true
    }
});

gameStateSchema.methods.setRound = function(round, activeTeam, playerIndex, questionIndex) {
    this.round = {
        round: round,
        activeTeam: activeTeam,
        playerIndex: playerIndex,
        questionIndex: questionIndex
    }
    this.markModified('round');
    return this.round
}

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
    } else {
        this.status = "In Progress";
    }
}

gameStateSchema.methods.setQuestions = function(question) {
    return new Promise(function(resolve, reject) {
        if (this.nextQuestion) {
            this.previousQuestions.push(this.nextQuestion);
        }
        this.nextQuestion = question;
        this.markModified('nextQuestion');
        this.markModified('previousQuestions');
        resolve(question) 
    }.bind(this))
}

gameStateSchema.methods.resetScores = function() {
    this.resetTeamOneScore()
    this.resetTeamTwoScore()
}

gameStateSchema.methods.guessRight = function(context) {
    return new Promise(function(resolve, reject) {
        let numPlayers = this.teams[this.round.activeTeam].players.length
        if (context !== 'steal') {
            let playerIndex = (this.round.playerIndex + 1) % numPlayers
            this.teams[this.round.activeTeam].playerIndex = playerIndex
            this.round.playerIndex = playerIndex
            this.round.questionIndex++ 
            if (this.round.questionIndex > 5) {
                this.round.questionIndex = 1
                resolve({win: true, guess: true, steal:false, coins: 0})
            } else {
                resolve({win: false, guess: true, steal:false, coins: 0})
            }
        } else {
            let applyCoins;
            switch(this.round.questionIndex - 1) {
                case 1: applyCoins = 100; break;
                case 2: applyCoins = 300; break;
                case 3: applyCoins = 700; break;
                case 4: applyCoins = 1500; break;
                case 5: applyCoins = 3100; break;
                default: applyCoins = 100; break;
            }
            if (this.round.activeTeam === 'team1') {
                this.round.round++
            }
            this.teams[this.round.activeTeam].score += applyCoins
            let coinTotal = this.teams[this.round.activeTeam].score
            this.round.playerIndex = this.teams[this.round.activeTeam].playerIndex
            resolve({win: true, guess: true, steal:true, coins: coinTotal})
        }
    }.bind(this))
}

gameStateSchema.methods.guessWrong = function(context) {
    return new Promise(function(resolve, reject) {
        if (context !== 'steal') {
            if (this.round.activeTeam === 'team1') {
                this.round.activeTeam = 'team2'
            } else {
                this.round.activeTeam = 'team1'
            }
            this.round.playerIndex = this.teams[this.round.activeTeam].playerIndex
            resolve({win: false, guess: false, steal:false, coins: 0})
        } else {
            let applyCoins;
            switch(this.round.questionIndex - 1) {
                case 1: applyCoins = 100; break;
                case 2: applyCoins = 300; break;
                case 3: applyCoins = 700; break;
                case 4: applyCoins = 1500; break;
                case 5: applyCoins = 3100; break;
                default: applyCoins = 100; break;
            }
            let coinTotal;
            if (this.round.activeTeam === 'team2') {
                this.round.round++
                this.teams['team1'].score += applyCoins
                coinTotal = this.teams['team1'].score 
            } else {
                this.teams['team2'].score += applyCoins
                coinTotal = this.teams['team2'].score
            }
            resolve({win: false, guess: false, steal:true, coins: coinTotal})
        }
        
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

gameSchema.methods.formatRoster = function(){
    let teams = this.gameState.teams
    let roster = {
        teamOne: teams.team1.players,
        teamTwo: teams.team2.players,
    }
    return roster;
}

gameSchema.methods.setRound = function(round, activeTeam, playerIndex, questionIndex) {
    return this.gameState.setRound(round, activeTeam, playerIndex, questionIndex)
}

gameSchema.methods.setQuestions = function(originalQuestion) {
    return new Promise(function(resolve, reject) {
        this.gameState.setQuestions(originalQuestion).then(function(question) {
            resolve(question)
        })
    }.bind(this))
}

gameSchema.methods.resetScores = function() {
    return this.gameState.resetScores()
}

gameSchema.methods.guess = function(guess, context) {
    let answer = this.gameState.nextQuestion.answer
    if (guess.toLowerCase() === answer.toLowerCase()) {
        return this.gameState.guessRight(context)
    } else {
        return this.gameState.guessWrong(context)
    }
}


var Game = mongoose.model('Game', gameSchema);

module.exports = Game;