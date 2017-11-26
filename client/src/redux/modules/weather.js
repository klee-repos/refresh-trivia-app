const SET_LOCATION = 'SET_LOCATION'

export function setWeatherLocation(location){
    return {
        type: SET_LOCATION,
        location
    }
}

export default function apps(state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return Object.assign({},state,{
                location: action.location
            })
        default: 
            return state;
    }
}