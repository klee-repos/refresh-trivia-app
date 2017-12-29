
import {MainMenuContainer} from '../containers'

const _appMap = {
    "mainMenu": () => MainMenuContainer
    // "blackjack": () => TwentyOneContainer,
    // "gdax": () => GdaxContainer,
    // "iex": () => IEXContainer,
    // "hackerNews": () => HackerNewsContainer,
    // "weather": () => WeatherForecastContainer
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