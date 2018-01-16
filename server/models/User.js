var mongoose = require('mongoose');
var guid = require('uuid/v4');

const ContextMap = require('../ContextMap')

/* /////////////////////////////////
// Context
*/ ///////////////////////////////
var contextSchema = mongoose.Schema(
{
	name: String,
	previous: String,
	activeIntents: Array,
});

/* /////////////////////////////////
// User
*/ ///////////////////////////////

var userSchema = new mongoose.Schema(
{	
	began: {type:Date, default:Date.now},
	sessionCode: String,
	game: {type:mongoose.Schema.Types.ObjectId, ref:"Game"},
	context: String
});

userSchema.methods.generateSessionCode = function(){
	this.sessionCode = guid();
	this.markModified('sessionCode');
}

userSchema.methods.setContext = function(_context){	
	this.context = _context
	this.markModified('context');
}

userSchema.methods.getPreviousContext = function() {
	return this.context.previous;
}

var User = mongoose.model('User', userSchema);

module.exports = User;