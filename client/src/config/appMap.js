import {TwentyOneContainer, GdaxContainer, WeatherContainer}  from '../containers/'

const _appMap = {
    "blackjack": () => TwentyOneContainer,
    "gdax": () => GdaxContainer,
    "weather": () => WeatherContainer
}

var getOpenApps = function(apps){
    var openApps = []
    Object.keys(apps).map(function(key){
        return openApps.push(_appMap[key]());
    });
    return openApps;
}

const AppMap = {
    getOpenApps: getOpenApps
}

export default AppMap