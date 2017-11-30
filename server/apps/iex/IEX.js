
const iexSocket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops')

var stockList = ['snap', 'aapl', 'gm', 'tsla']

var testData = {"symbol":"TSLA","marketPercent":0.0278,"bidSize":0,"bidPrice":0,"askSize":0,"askPrice":0,"volume":243326,"lastSalePrice":306.81,"lastSaleSize":100,"lastSaleTime":1511990427485,"lastUpdated":1511990427485,"sector":"automobilescomponents","securityType":"commonstock"}

var stockData=[];

var IEXProvider = function(_io) {
    iexTopic = _io.to('iex-updates');

	iexSocket.on('connect', () => {	
		// Subscribe to topics (i.e. appl,fb,aig+)
		stockList.map(function(stock) {
			iexSocket.emit('subscribe', stock)
		})
	})

	iexSocket.on('message', function(data) {

		// duplicate handling    
		var search = stockList.filter(stockItem => stockItem.symbol === stock);
		if (search.length > 0) {
			stockList
		}

		stockData.unshift({
			symbol: data.symbol,
			lastSalePrice: data.lastSalePrice,
			lastSaleTime: data.lastSaleTime,
			sector: data.sector,
			securityType: data.securityType
		})
		console.log(data)
		console.log(stockData);
	});


}

module.exports =  IEXProvider;