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

export function getForecast(loc){
    return function(dispatch){
        WeatherRequests.today(loc.lat,loc.long)
            .then((res) => dispatch(updateForecast(res.data)))
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
    }
}

export default function apps(state = initialState, action){
    switch(action.type){
        case UPDATE_LOCATION:
            return Object.assign({},state,{
                location: {
                    lat: action.location.lat,
                    long: action.location.long,
                }
            })
        case UPDATE_FORECAST:
            return Object.assign({},state,{
                forecast: {
                    summary: action.forecast.hourly.summary,
                    temp: action.forecast.currently.temperature,
                    icon: action.forecast.currently.icon,
                }
            })
        default: 
            return state;
    }
}