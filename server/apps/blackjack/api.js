var routes = require('express').Router();

routes.get('/deal/:name', function(req, res) {
    var blackjack = blackjackGamesBySession[req.params.name];
    blackjack.startNewGame();
    io.to(req.params.name).emit('updateCards', blackjack);
    res.send(blackjack);
})

routes.get('/hit/:name', function(req, res) {
    var blackjack = blackjackGamesBySession[req.params.name];
    blackjack.hit();
    io.to(req.params.name).emit('updateCards', blackjack);
    res.send(blackjack);
})

routes.get('/stand/:name', function(req, res) {
    var blackjack = blackjackGamesBySession[req.params.name];
    blackjack.stand();
    io.to(req.params.name).emit('updateCards', blackjack);
    res.send(blackjack);
})


module.exports = routes;