var mongoose = require('mongoose');
var guid = require('uuid/v4');

var userSchema = new mongoose.Schema(
{
	id: mongoose.Schema.Types.ObjectId,
	began: {type:Date, default:Date.now},
	sessionCode: String,
	gAssistantId: String
});

var User = mongoose.model('User', userSchema);

User.generateSessionCode = guid;

module.exports = User;