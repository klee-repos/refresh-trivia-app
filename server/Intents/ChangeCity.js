
const DarkSky = require('dark-sky');
const darkSky = new DarkSky(process.env.DARK_SKY);

var geoOptions = {provider: 'google',apiKey: process.env.GOOGLE_GEOCODER}
const geocoder = require('node-geocoder')(geoOptions);

var User = require('../models/User');

var ChangeCity = function(result, sessionManager, sessionCode) {
    if (result.parameters.fields.location) {
        var location = result.parameters.fields.location.stringValue;
        geocoder.geocode(location).then(function(data){
            var update = {
                city: data[0].city, 
                lat: data[0].latitude, 
                long: data[0].longitude
            }
            User.findOne({sessionCode:sessionCode}, function(err, user) {
                if(user) {
                    user.setPreference('weather', update)
                    user.save();
                }
            }).then(function() {
                sessionManager.io.emit("weather", update);
            })
        })
    }
}

module.exports = ChangeCity;