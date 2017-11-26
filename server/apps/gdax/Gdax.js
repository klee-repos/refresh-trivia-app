var GDAX = require('gdax');
var gdaxSocket;
var gdaxTopic;

var moveETH;
var differenceETH
var moveBTC;
var differenceBTC;

var newHistoryETH = [];
var sellPriceHistoryETH= [];
var buyPriceHistoryETH = [];

var newHistoryBTC = [];
var sellPriceHistoryBTC =[];
var buyPriceHistoryBTC = [];

var gdaxSocket = new GDAX.WebsocketClient(['BTC-USD', 'ETH-USD']);

var GDAXProvider = function(_io) {
    gdaxTopic = _io.to('gdax-updates');

    gdaxSocket.on('message', function(data) {

        // Ethereum
        if (data.reason === 'filled' && data.price && data.product_id === 'ETH-USD') {

            if (data.side === 'sell') {
                newHistoryETH = sellPriceHistoryETH;
            } else {
                newHistoryETH = buyPriceHistoryETH;
            }

            if (newHistoryETH.length > 0) {
                differenceETH = parseFloat(data.price) - parseFloat(newHistoryETH[0]);
            } else {
                differenceETH = 0;
            }

            if (differenceETH > 0)
                moveETH = 'up'
            if (differenceETH < 0)
                moveETH = 'down'

            if (differenceETH === 0 && newHistoryETH.length <= 1) {
                newHistoryETH.unshift([parseFloat(data.price).toFixed(2), parseFloat(differenceETH).toFixed(2),moveETH]);
            }
            if (differenceETH !== 0) {
                newHistoryETH.unshift([parseFloat(data.price).toFixed(2), parseFloat(differenceETH).toFixed(2),moveETH]);
            } 

            if (data.side === 'sell') {
                if (sellPriceHistoryETH.length > 5) {
                    sellPriceHistoryETH.pop();
                }
                gdaxTopic.emit('sellPriceHistoryETH', sellPriceHistoryETH);
            } else {
                if (buyPriceHistoryETH.length > 5) {
                    buyPriceHistoryETH.pop();
                }
                gdaxTopic.emit('buyPriceHistoryETH', buyPriceHistoryETH);
            }

        }

        // Bitcoin
        if (data.reason === 'filled' && data.price && data.product_id === 'BTC-USD') {

            if (data.side === 'sell') {
                newHistoryBTC = sellPriceHistoryBTC;
            } else {
                newHistoryBTC = buyPriceHistoryBTC;
            }

            if (newHistoryBTC.length > 0) {
                differenceBTC = parseFloat(data.price) - parseFloat(newHistoryBTC[0]);
            } else {
                differenceBTC = 0;
            }

            if (differenceBTC > 0)
                moveBTC = 'up'
            if (differenceBTC < 0)
                moveBTC = 'down'

            if (differenceBTC === 0 && newHistoryBTC.length <= 1) {
                newHistoryBTC.unshift([parseFloat(data.price).toFixed(2), parseFloat(differenceBTC).toFixed(2),moveBTC]);
            }
            if (differenceBTC !== 0) {
                newHistoryBTC.unshift([parseFloat(data.price).toFixed(2), parseFloat(differenceBTC).toFixed(2),moveBTC]);
            } 

            if (data.side === 'sell') {
                if (sellPriceHistoryBTC.length > 5) {
                    sellPriceHistoryBTC.pop();
                }
                gdaxTopic.emit('sellPriceHistoryBTC', sellPriceHistoryBTC);
            } else {
                if (buyPriceHistoryBTC.length > 5) {
                    buyPriceHistoryBTC.pop();
                }
                gdaxTopic.emit('buyPriceHistoryBTC', buyPriceHistoryBTC);
            }
        }
    })
}

module.exports = GDAXProvider;