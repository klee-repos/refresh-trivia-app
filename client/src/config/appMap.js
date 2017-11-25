//Why doesn't importing these from containers/index.js work?
import TwentyOneContainer from '../containers/TwentyOne/TwentyOneContainer'
import GdaxContainer from '../containers/Gdax/GdaxContainer'


const _appMap = {
    "blackjack": TwentyOneContainer,
    "gdax": GdaxContainer
}

var getAppFromName = function(name){
    return _appMap[name];
}

var getOpenApps = function(apps){
    var openApps = []
    var keys = Object.keys(apps);
    keys.map(function(key){
        openApps.push(_appMap[key])
    });
    return openApps;
}

const AppMap = {
    getAppFromName: getAppFromName,
    getOpenApps: getOpenApps,
    map: _appMap
}

export default AppMap