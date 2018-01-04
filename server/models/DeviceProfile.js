var mongoose = require('mongoose');
var guid = require('uuid/v4');

var deviceProfileSchema = new mongoose.Schema(
{
    platform: String,
    id: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

var DeviceProfile = mongoose.model('Device', deviceProfileSchema);

module.exports = DeviceProfile;