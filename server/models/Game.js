var mongoose = require('mongoose');
var _ = require('lodash')
var Questions = require('./Question')

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
        var activeTeam = this.teams[this.round.activeTeam];
        let numPlayers = activeTeam.players.length
        var result = {guess: true, steal: false, coins: 0, bonus: false}

        if (context !== 'steal') {
        /* Question Correct */

            //Cycle Roster
            let playerIndex = (this.round.playerIndex + 1) % numPlayers
            activeTeam.playerIndex = playerIndex
            this.round.playerIndex = playerIndex
            
            //Increase difficulty and check win
            this.round.questionIndex++

            if (this.round.questionIndex === 6) {
                activeTeam.score += pointValue(this.round.questionIndex)
                this.round.round++
                this.round.questionIndex = 1;
                if (this.round.activeTeam === 'team1') {
                    this.round.activeTeam = 'team2'
                    this.round.playerIndex = this.teams.team2.playerIndex
                } else {
                    this.round.activeTeam = 'team1'
                    this.round.playerIndex = this.teams.team1.playerIndex
                }
                result.bonus = true;
            }

        } else {
        /* Successful Steal */
            //Update Score
            console.log()
            activeTeam.score += pointValue(this.round.questionIndex)
            result.coins = activeTeam.score
            result.steal = true;

            //Next Turn Start
            this.round.playerIndex = activeTeam.playerIndex
            this.round.questionIndex = 1;

            //Update round if end of 2nd turn
            if (this.round.activeTeam === 'team1') {
                this.round.round++
            }
        }
        this.getNextQuestion().then(function(question){
            result.question = question;
            resolve(result)
        }).catch(function(err){
            console.log(err)
        })
    }.bind(this))
}

gameStateSchema.methods.guessWrong = function(context) {
    return new Promise(function(resolve, reject) {
        var result = {win:false, guess:false, coins: 0, steal: false, bonus: false};

        if (context !== 'steal') {
        /* Question Wrong */
            //Move to steal
            if (this.round.activeTeam === 'team1') {
                this.round.activeTeam = 'team2'
            } else {
                this.round.activeTeam = 'team1'
            }
            this.round.playerIndex = this.teams[this.round.activeTeam].playerIndex
        } else {
            result.steal = true;
            //Give coins to original team
            if (this.round.activeTeam === 'team2') {
                this.teams['team1'].score += pointValue(this.round.questionIndex)
                result.coins = this.teams['team1'].score 
            } else {
                this.round.round++
                this.teams['team2'].score += pointValue(this.round.questionIndex)
                result.coins = this.teams['team2'].score
            }
            this.round.questionIndex = 1;
        }
        this.getNextQuestion().then(function(question){
            result.question = question;
            resolve(result)
        }).catch(function(err){
            console.log(err)
        })
    }.bind(this))
}

var pointValue = function(questionIndex){
    switch(questionIndex - 1) {
        case 1: return 100;
        case 2: return 300;
        case 3: return 700;
        case 4: return 1500;
        case 5: return 3100;
        default: return 100;
    }
}

gameStateSchema.methods.getNextQuestion = function(){
    return new Promise(function(resolve,reject){
        var difficulty = this.round.questionIndex;
        var category = this.round.category;
        var excludedQuestions = this.previousQuestions;
        // var opts = {difficulty: difficulty, category: category, excludedQuestions: excludedQuestions};
        Questions.getRandomQuestion()
            .then(function(question){
                this.previousQuestions.push(this.nextQuestion);
                this.nextQuestion = question._id;
                resolve(question);
            }.bind(this))
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

gameSchema.methods.getNextUpPlayer = function(){
    var roster = this.gameState.teams;
    var activeTeam = this.gameState.round.activeTeam
    var playerIndex = this.gameState.round.playerIndex;
    return roster[activeTeam].players[playerIndex]
}

gameSchema.methods.getActiveTeam = function(){
    return this.gameState.round.activeTeam
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

gameSchema.methods.getWinningTeam = function(){
    let teamOneScore = game.gameState.teams.team1.score
    let teamTwoScore = game.gameState.teams.team2.score
    if (teamOneScore > teamTwoScore) {
        return 'Team 1'
    } else {
        return 'Team 2'
    }
    if (teamOneScore === teamTwoScore) {
        return 'Everyone'
    }
}



var Game = mongoose.model('Game', gameSchema);

module.exports = Game;