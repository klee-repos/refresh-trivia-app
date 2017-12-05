import {TwentyOneContainer, 
        GdaxContainer, 
        IEXContainer, 
        HackerNewsContainer, 
        WeatherForecastContainer}  from '../containers/'

const _appMap = {
    "blackjack": () => TwentyOneContainer,
    "gdax": () => GdaxContainer,
    "iex": () => IEXContainer,
    "hackerNews": () => HackerNewsContainer,
    "weather": () => WeatherForecastContainer
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