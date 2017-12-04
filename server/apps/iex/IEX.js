
const iexSocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')

var stockList = ['snap', 'aapl', 'gm', 'tsla']

var stockData = {};

var IEXProvider = function(_io) {
    iexTopic = _io.to('iex-updates');

	iexSocket.on('connect', () => {	
		// Subscribe to topics (i.e. appl,fb,aig+)
		stockList.map(function(stock) {
			iexSocket.emit('subscribe', stock)
		})
	})

	iexSocket.on('message', function(data) {
		var jsonData = JSON.parse(data)
		var name = jsonData.symbol;
		stockData[name] = {
			lastSalePrice: jsonData.lastSalePrice,
			lastSaleTime: jsonData.lastSaleTime,
			sector: jsonData.sector,
			securityType: jsonData.securityType
		}
		console.log(stockData);
	});


}

module.exports =  IEXProvider;