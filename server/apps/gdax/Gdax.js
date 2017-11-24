var GDAX = require('gdax');
var gdaxSocket;
var gdaxTopic;

var GDAXProvider = function(_io){
    gdaxTopic = _io.to('gdax-updates');

  var gdaxSocket = new GDAX.WebsocketClient(['BTC-USD', 'ETH-USD']);

  gdaxSocket.on('message', function(data) {
    if (data.reason === 'filled' && data.price) 
        gdaxTopic.emit('gdaxData',data);
    });
}

module.exports = GDAXProvider;