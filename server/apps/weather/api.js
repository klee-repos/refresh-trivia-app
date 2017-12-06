var routes = require('express').Router();
const DarkSky = require('dark-sky');
var User = require('../../models/User');
const darkSky = new DarkSky(process.env.DARK_SKY);

var geoOptions = {provider: 'google',apiKey: process.env.GOOGLE_GEOCODER}
const geocoder = require('node-geocoder')(geoOptions);

routes.post('/changeCity', function(req,res){
    if (req.body.location){
        geocoder.geocode(req.body.location).then(function(data){
            var update = {
                city: data[0].city, 
                lat: data[0].latitude, 
                long: data[0].longitude
            }
            User.findOne({sessionCode:req.sessionCode}, function(err, user) {
                if(user) {
                    user.setPreference('weather', update)
                    user.save();
                }
            }).then(function() {
                req.io.emit("weather", update);
                res.status(200).send(update);  
            })
        })
    }
});

routes.get('/forecast/today', function(req,res){
    return darkSky
        .latitude(req.query.lat)
        .longitude(req.query.long)
        .exclude('flags,minutely')
        .get()
        .then(function(data){
            res.send(data)
        })
        // .catch(res.end())
    });

routes.get('/forecast/week', function(req,res){
    return darkSky
        .latitude(req.query.lat)
        .longitude(req.query.lon)
        .exclude('flags,hourly,minutely')
        .get()
        .then(function(data){
            res.send(data);
        })
        // .catch(console.log)
});

module.exports = routes;