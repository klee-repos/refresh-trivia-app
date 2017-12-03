const SET_PROFILE = 'SET_PROFILE';
const SET_APP_PREFERENCE = "SET_APP _PREFERENCE";

export function setAppPreference(location){
    return {
        type: SET_APP_PREFERENCE,
        location
    }
}

const initialState = {
    appPreferences: 
}

export default function apps(state = initialState, action){
    switch(action.type){
        case SET_LOCATION:
            return Object.assign({},state,{

            })
        default: 
            return state;
    }
}