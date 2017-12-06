var routes = require('express').Router();
const DarkSky = require('dark-sky');
const geocoder = require('geocoder');
var User = require('../../models/User');

const darkSky = new DarkSky(process.env.DARK_SKY);

routes.post('/changeCity', function(req,res){
    if (req.body.location){
        geocoder.geocode(req.body.location,function(err,data){
            if(err){
                res.status(400).send(err);
            }
            if(data){
                if(!data.results[0]) return res.status(400).send()
                var lat = data.results[0].geometry.location.lat;
                var long = data.results[0].geometry.location.lng;
                var update = {
                    city:req.body.location, 
                    lat: lat, 
                    long: long
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
            }
        })
    } else {
        res.status(404).send("Missing location data");
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