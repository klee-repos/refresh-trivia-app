var mongoose = require('mongoose');
var guid = require('uuid/v4');

var generateSessionCode = function(){
	return guid();
}

var userSchema = new mongoose.Schema(
{
	began: {type:Date, default:Date.now},
	sessionCode: String,
	amzUserId: String
});

var User = mongoose.model('User', userSchema);

User.generateSessionCode = generateSessionCode;

module.exports = User;