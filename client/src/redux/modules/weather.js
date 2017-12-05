import {WeatherRequests} from '../../requests';

const SET_LOCATION = 'SET_LOCATION'

export function updateLocation(location){
    return {
        type: SET_LOCATION,
        location
    }
}

// function updateWeather(loc){
//     WeatherRequests.today(loc.lat,loc.long)
// }

const initialState = {
    location:{
        lat: null,
        long: null,
        city: null
    },
    weather:{
        summary: null,
        temp: null
    }
}

export default function apps(state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return Object.assign({},state,{
                location: {
                    lat: action.location.lat,
                    long: action.location.long,
                }
            })
        // case SET_WEATHER:
        // return Object.assign({},state,{

        // })
        default: 
            return state;
    }
}