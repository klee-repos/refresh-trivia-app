var routes = require('express').Router();

routes.post('/open', function(req,res){
    req.io.emit("openApp", "gdax");
    res.status(200).send();
});

module.exports = routes;