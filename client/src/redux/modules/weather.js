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
        forecast
    }
}

function setIcon(i) {
    var icon = i.replace(/-/g, "_")
    return icon.toUpperCase()
}

function getForecastStructure(day){
    return {
        summary: day.summary,
        tempHigh: day.temperatureHigh,
        tempLow: day.temperatureLow,
        icon: setIcon(day.icon)
    }
}

export function getForecast(loc){
    return function(dispatch){
        WeatherRequests.today(loc.lat,loc.long)
            .then((res) => {
                var updatedForecast = res.data.daily.data
                    .filter((day,idx) => {if(idx < 5) return day} )
                    .map((day,idx) => {return getForecastStructure(day)});

                updatedForecast[0].currentTemp = res.data.currently.temperature;
                var forecast = {
                    currently: updatedForecast[0],
                    future: updatedForecast.slice(1)
                }
                dispatch(updateForecast(forecast));
            })
    }
}

const initialState = {
    location:{
        lat: null,
        long: null,
        city: null
    },
    forecast: {
        currently: {},
        future: {}
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
                    currently: action.forecast.currently,
                    future: action.forecast.future
                }
            })
        default: 
            return state;
    }
}