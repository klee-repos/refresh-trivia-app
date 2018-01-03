var mongoose = require('mongoose');
var guid = require('uuid/v4');

var deviceSchema = new mongoose.Schema(
{
    platform: String,
    id: String,
    user: {type: Schema.Types.ObjectId, ref:'User'}
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;