var mongoose = require('mongoose');
var guid = require('uuid/v4');

const ContextMap = require('../ContextMap')

/* /////////////////////////////////
// Context
*/ ///////////////////////////////
var contextSchema = mongoose.Schema(
{
	name: String,
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
	context: {type:contextSchema, default: null}
});

userSchema.methods.generateSessionCode = function(){
	this.sessionCode = guid();
	this.markModified('sessionCode');
}

userSchema.methods.setContext = function(context){	
	this.context = {
		name: context, 
		activeIntents: ContextMap[context].activeIntents,
	}
	this.markModified('context');
}

var User = mongoose.model('User', userSchema);

module.exports = User;