var routes = require('express').Router();
var Blackjack = require('./Blackjack');
var blackjackGamesBySession = {};

routes.use(function(req, res, next){
    //lookup blackjack for this request
    //create blackjack if not yet created
    if(!blackjackGamesBySession[req.sessionCode]){
        console.log(req.sessionCode);
        blackjackGamesBySession[req.sessionCode] = new Blackjack();
    }
    next();
})

routes.post('/deal/', function(req, res) {
    var blackjack = blackjackGamesBySession[req.sessionCode];
    blackjack.startNewGame();
    req.io.emit('updateCards', blackjack);
    res.send(blackjack);
})

routes.post('/hit/', function(req, res) {
    var blackjack = blackjackGamesBySession[req.sessionCode];
    blackjack.hit();
    req.io.emit('updateCards', blackjack);
    res.send(blackjack);
})

routes.post('/stand/', function(req, res) {
    var blackjack = blackjackGamesBySession[req.sessionCode];
    blackjack.stand();
    req.io.emit('updateCards', blackjack);
    res.send(blackjack);
})


module.exports = routes;