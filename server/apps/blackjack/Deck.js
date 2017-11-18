var suits = ['d', 'c', 'h', 's'];
var values = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
var deck = [];
var Promise = require('bluebird');

// Creates a deck of cards from suits and values array
var createDeck = function() {
    for (var suitP = 0; suitP < suits.length; suitP++) {
        for (var valueP = 0; valueP < values.length; valueP++) {
            deck.push(values[valueP] + suits[suitP]);
        }
    }
    return deck;
}

// Standard implementation of Fisher-Yates (Knuth) Shuffle of array
var shuffle = function(array) {
    return new Promise(function(resolve, reject){
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        resolve(array);
      }        
  });
}

class Deck{
    constructor(){
        this.cards = createDeck();
        return this;
    }

    shuffle(){
        shuffle(this.cards);
        return this;
    }

    deal(number, bottom){
        if(!number) number = 1;

        if(number > this.cards.length){
            throw new Error("Ran out of cards");
        }

        var dealt = [];
        if(bottom){
            var last = this.cards.length;
            var dealt = this.cards.slice(last-number,last);
            while(number > 0){
                this.cards.pop();
                number--;
            }
        }else{
            var dealt = this.cards.slice(0,number);
            while(number > 0){
                this.cards.shift();
                number--;
            }
        }
        return dealt;
    }

}



module.exports = Deck;




