const Sounds = require('../../Sounds')

var Script = function(_assistant){
    this.assistant = _assistant;
    return {
        bonus: function(game){
            var nextPlayerUp = game.getNextUpPlayer();
            this.assistant.pause('2s').say(nextPlayerUp + "!").pause('400ms').say('Back to you!')
            .reprompt.say('I need an answer')
        }.bind(this),
        
        changeTurns: function(game){
            var nextPlayerUp = game.getNextUpPlayer();
            this.assistant.pause('2s').say(nextPlayerUp + "!").pause('400ms').say('Back to you!')
            .reprompt.say('I need an answer')
            this.assistant.setContext('guess', 1)
        }.bind(this),
        
        correct: function(game){
            this.assistant
            .play(Sounds.forward)
            .say('Correct!').pause('1.5s')
        }.bind(this),
        
        incorrect:function(game){
            this.assistant.say('Sorry, that\'s incorrect.').pause('1s')
        }.bind(this), 
        
        gameOver:function(game){
            this.assistant.say('Game Over!').pause('1s')
                .say(game.getWinningTeam() + ', you win')
                .play(Sounds.forward)
        }.bind(this),
        
        playOrBank: function(game){
            this.assistant.say('Play?').pause('200ms').say('or bank.')
           .reprompt.say('Play?').reprompt.pause('300ms').reprompt.say('or bank?')   
        }.bind(this),
        
        chanceToSteal: function(game){
            let team;
            if (game.getActiveTeam() === 'team1') {
                team = 'Team 1'
            } else {
                team = 'Team 2'
            }
            this.assistant
            .say(team + ', your chance to steal.')
            .reprompt.say("I need an answer")
            .setContext('guess', 1)
        }.bind(this)
    }
   
}




module.exports = Script