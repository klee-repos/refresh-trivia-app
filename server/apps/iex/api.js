var routes = require('express').Router();

// Request promise
var requestPromise = require('request-promise');
var stockList = [];

routes.use(function(req, res, next){
    next();
})

routes.post('/current/', function(req, res) {
    req.io.emit('updateStockList', stockList);
    res.send({'status':'updated'});
})

routes.post('/add/', function(req, res) {
    var stock = req.body.stock;

    // duplicate handling    
    var search = stockList.filter(stockItem => stockItem.symbol === stock);
    if (search.length > 0) {
        res.send({'status':'duplicate'});
        return;
    }

    var reqOptions = {
        method: 'GET',
        uri: 'https://api.iextrading.com/1.0/stock/' + stock + '/quote',
        json: true
    };

    return requestPromise(reqOptions)
        .then(function(jsonRes) {

            var ytdChange = (parseFloat(jsonRes.ytdChange) * 100).toFixed(2)

            stockList.push({
                symbol: jsonRes.symbol,
                companyName: jsonRes.companyName,
                sector: jsonRes.sector,
                latestPrice: jsonRes.latestPrice,
                ytdChange: parseFloat(ytdChange)
            })

            console.log(stockList);
            req.io.emit('updateStockList', stockList)
            res.send(jsonRes);

        }).catch(function(err) { 
            console.log(err)
            res.send({'status':err});
        })
})

routes.post('/remove/', function(req, res) {
    var stock = req.body.stock;
    var updatedList = stockList.filter(stockItem => stockItem.symbol !== stock);

    console.log(updatedList)
    stockList = updatedList.slice();
    req.io.emit('updateStockList', stockList)
    res.send(stockList);
})

module.exports = routes;