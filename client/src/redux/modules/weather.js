import {WeatherRequests} from '../../requests';

const UPDATE_LOCATION = 'UPDATE_LOCATION'
const UPDATE_FORECAST = 'UPDATE_FORECAST'
const CHANGE_FORECAST_DAY = 'CHANGE_FORECAST_DAY'

export function updateLocation(location){
    return {
        type: UPDATE_LOCATION,
        location
    }
}

export function changeActiveDay(forecastDay){
    return {
        type: CHANGE_FORECAST_DAY,
        forecastDay
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
        icon: setIcon(day.icon),
        sunriseTime:day.sunriseTime,
        sunsetTime:day.sunsetTime
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
        future: {},
        activeDay: null
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
        case CHANGE_FORECAST_DAY: 
            return Object.assign({}, state, {
                forecast: {
                    activeDay: action.forecastDay,
                    currently: state.forecast.currently,
                    future: state.forecast.future
                }
            })
        default: 
            return state;
    }
}