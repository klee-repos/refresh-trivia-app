var mongoose = require('mongoose');


var sessionSchema = new mongoose.Schema(
	{
		_id: Number,
		began: {type:Date, default:Date.now},
		name: Number,
		amzUserId: String,
		apps: [Object]
	});

var Session = mongoose.model('Session', sessionSchema);


Session.generateName = function() {
	return new Promise(function(resolve,reject){
	  resolve(Math.floor(Math.random() * (10000 - 1000)) + 1000); //The maximum is exclusive and the minimum is inclusive
	})
}

module.exports = Session;