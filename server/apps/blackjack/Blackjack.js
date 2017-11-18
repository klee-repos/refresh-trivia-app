var Deck = require('./Deck');
var Promise = require('bluebird');

function Blackjack(){
	var deck, faceDownDealerCard;
	var numPlayers = 1;

	//Public methods
	this.startNewGame= function(){
		deck = (new Deck()).shuffle();
		this.playerHand = {
			cards: deck.deal(2),
			blackjack: false,
			bust: false
		};
		this.dealerHand = {
			cards: deck.deal(),
			blackjack:false,
			bust: false
		}
		faceDownDealerCard = deck.deal();
		this.result = null;
		this.playerTurn = 1
		checkBlackjack(this, faceDownDealerCard, deck).then(function(result){
			return;
		});
    }

    this.hit = function(){
    	if(this.result)
    		return;

    	this.playerHand.cards.push(deck.deal()[0]);

    	if(handValue(this.playerHand.cards) > 21 )
    	{
    		this.playerHand.bust = true;
    		endGame(this, faceDownDealerCard, deck);
    	}

    	if(handValue(this.playerHand.cards) == 21){
    		endGame(this, faceDownDealerCard, deck);
    	};

    }

    this.stand = function(){
    	if(this.result)
    		return;
    	
    	endGame(this, faceDownDealerCard, deck);
    }

    //Private methods
    var checkBlackjack = function(game, faceDownDealerCard){
    	return new Promise(function(resolve,reject){
		 	if (handValue(game.playerHand.cards) == 21) 
	        {
	            game.playerHand.blackjack = true;
	            resolve(endGame(game, faceDownDealerCard,deck))
	        }
	        else
	        {
		    	if(handValue(game.dealerHand.cards.concat(faceDownDealerCard)) == 21){
		    		resolve(endGame(game, faceDownDealerCard,deck));
		    	}
		    	resolve();
	        }
    	});
    };

    var endGame = function(game, faceDownDealerCard, deck){
    	return new Promise(function(resolve,reject){
			game.dealerHand.cards.push(faceDownDealerCard[0]);

			//Dealer blackjack
	    	if(handValue(game.dealerHand.cards) == 21)
	    	{
	    		game.dealerHand.blackjack = true;
	    		if(game.playerHand.blackjack)
	    			resolve(game.result = "Push");
	    		else
	    			resolve(game.result = "Dealer wins - Blackjack");
	    	}

	    	//Player wins blackjack
	    	if(game.playerHand.blackjack)
    			resolve(game.result = "Player wins - Blackjack")
	    	

	    	if(game.playerHand.bust){
	    		resolve(game.result = "Player lose - Bust");
	    	}else{
	    		//Play out dealer hand
				while(handValue(game.dealerHand.cards) <=16){
		            game.dealerHand.cards.push(deck.deal()[0]);
		        }
		        var playerScore = handValue(game.playerHand.cards);
		        var dealerScore = handValue(game.dealerHand.cards);

		        if(dealerScore > 21){
		        	game.dealerHand.bust = true;
		        	resolve(game.result = "Player wins - dealer bust");
		        } else if(playerScore == dealerScore){
		        	resolve(game.result = "Push");
		        } else if(playerScore > dealerScore){
		        	resolve(game.result = "Player wins - closer to 21");
		        } else {
		        	resolve(game.result = "Dealer wins - closer to 21");
		        }
	    	}
	    	});
    };

    var handValue = function(hand){
        var value = handMinValue(hand);
        if(value > 21){
            this.currentPlayer ++;
            return value;
        }
        else if (containsAce(hand)){
            if((value + 10) <= 21){
                if(value + 10 == 21)
                    this.currentPlayer++;
                return value + 10;
            }  
        }
        return value;
    }

    var handMinValue = function(hand){
        var value = 0;
        for(const i in hand)
            value += cardValue(hand[i]);
        return value;
    }

    var cardValue = function(card){ 
        var cardinal = card[0]; 
        if(Number.parseInt(card))
            return Number.parseInt(card); 
        else if(cardinal == 'A')
            return 1;
        else
            return 10;
    }

    var containsAce = function(hand){
        for (const i in hand)
            if(cardValue(hand[i]) == 1)
                return true;

        return false;
    }
}

module.exports = Blackjack;