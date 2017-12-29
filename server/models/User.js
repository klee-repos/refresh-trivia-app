var mongoose = require('mongoose');
var guid = require('uuid/v4');

var generateSessionCode = function(){
	return guid();
}

var userSchema = new mongoose.Schema(
{
	began: {type:Date, default:Date.now},
	sessionCode: String,
	gAssistantId: String,
	preferences: Object
});

userSchema.methods.setPreference = function(appName, updates) {
	if (!this.preferences) {
		this.preferences = {};
	}
	this.preferences[appName] = updates;
	this.markModified('preferences');
}

var User = mongoose.model('User', userSchema);

User.generateSessionCode = generateSessionCode;

module.exports = User;