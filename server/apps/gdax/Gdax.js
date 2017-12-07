var GDAX = require('gdax');

var gdaxSocket;
var gdaxTopic;

var gdaxSocket = new GDAX.WebsocketClient(['BTC-USD', 'ETH-USD']);
var gdaxETHClient = new GDAX.PublicClient('ETH-USD');
var gdaxBTCClient = new GDAX.PublicClient('BTC-USD');


var getETHStatus = function(gdaxTopic) {
    gdaxETHClient
        .getProduct24HrStats(function(err, res, data) {
                if (err) {
                    console.log(err)
                } else {
                    gdaxTopic.emit('gdaxETHStatus', data)
                    console.log(data);
                }
            })
}

var getBTCStatus = function(gdaxTopic) {
    gdaxBTCClient
        .getProduct24HrStats(function(err, res, data) {
                if (err) {
                    console.log(err)
                } else {
                    gdaxTopic.emit('gdaxBTCStatus', data)
                    console.log(data);
                }
            })
}


var GDAXProvider = function(_io) {
    gdaxTopic = _io.to('gdax-updates');

    getETHStatus(gdaxTopic);
    getBTCStatus(gdaxTopic);

    setInterval(function() {
        getETHStatus(gdaxTopic);
        getBTCStatus(gdaxTopic);
    
    },10000)
    
    gdaxSocket.on('message', function(data) {
        
        // Ethereum
        if (data.reason === 'filled' && data.price && data.product_id === 'ETH-USD') {
            
            var currentETH = {
                price:parseFloat(data.price).toFixed(2),
            }    

            if (data.side === 'sell') {
                gdaxTopic.emit('sellPriceHistoryETH', currentETH);
            } else {
                gdaxTopic.emit('buyPriceHistoryETH', currentETH);
            }

        }

        // Bitcoin
        if (data.reason === 'filled' && data.price && data.product_id === 'BTC-USD') {

            var currentBTC = {
                price:parseFloat(data.price).toFixed(2),
            }

            if (data.side === 'sell') {
                gdaxTopic.emit('sellPriceHistoryBTC', currentBTC);
            } else {
                gdaxTopic.emit('buyPriceHistoryBTC', currentBTC);
            }
        }
    })
}

module.exports = GDAXProvider;