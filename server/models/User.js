var mongoose = require('mongoose');
var guid = require('uuid/v4');

var userSchema = new mongoose.Schema(
{
	began: {type:Date, default:Date.now},
	sessionCode: String,
	gAssistantId: String,
	game: {type:mongoose.Schema.Types.ObjectId, ref:"Game"}
});

userSchema.methods.generateSessionCode = function(){
	this.sessionCode = guid();
	this.markModified('sessionCode');
}

var User = mongoose.model('User', userSchema);



module.exports = User;