import {WeatherRequests} from '../../requests';

const UPDATE_LOCATION = 'UPDATE_LOCATION'
const UPDATE_FORECAST = 'UPDATE_FORECAST'

export function updateLocation(location){
    return {
        type: UPDATE_LOCATION,
        location
    }
}

function updateForecast(forecast){
    return {
        type: UPDATE_FORECAST,
        forecast,
    }
}

function setIcon(i) {
    var icon = i.replace(/-/g, "_")
    return icon.toUpperCase()
}

export function getForecast(loc){
    return function(dispatch){
        WeatherRequests.today(loc.lat,loc.long)
            .then((res) => {
                var icon = setIcon(res.data.currently.icon);
                var futureIcon;
                var forecast = res.data;
                for (var i = 1; i < 5; i++) {
                    futureIcon = setIcon(res.data.daily.data[i].icon);
                    forecast.daily.data[i].icon = futureIcon;
                }
                // var nextDayIcon = setIcon(res.data.daily.data[1].icon)
                forecast.icon = icon
                dispatch(updateForecast(forecast))
            })
    }
}

const initialState = {
    location:{
        lat: null,
        long: null,
        city: null
    },
    forecast:{
        summary: null,
        temp: null,
        icon: null,
        nextDay: null,
        secondDay: null,
        thirdDay: null,
        fourthDay: null
    }
}

export default function apps(state = initialState, action){
    switch(action.type){
        case UPDATE_LOCATION:
            return Object.assign({},state,{
                location: {
                    lat: action.location.lat,
                    long: action.location.long,
                    city: action.location.city,
                }
            })
        case UPDATE_FORECAST:
            return Object.assign({},state,{
                forecast: {
                    summary: action.forecast.hourly.summary,
                    temp: action.forecast.currently.temperature,
                    icon: action.forecast.icon,
                    nextDay: action.forecast.daily.data[1],
                    secondDay: action.forecast.daily.data[2],
                    thirdDay: action.forecast.daily.data[3],
                    fourthDay: action.forecast.daily.data[4],

                }
            })
        default: 
            return state;
    }
}