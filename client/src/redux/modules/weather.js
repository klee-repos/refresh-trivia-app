const SET_LOCATION = 'SET_LOCATION'

export function setWeatherLocation(location){
    return {
        type: SET_LOCATION,
        location
    }
}

const initialState = {
    lat: null,
    long: null,
}

export default function apps(state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return Object.assign({},state,{
                lat: action.location.lat,
                long: action.location.lng
            })
        default: 
            return state;
    }
}