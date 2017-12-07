
const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_SOCKET = 'SET_SOCKET';
const SET_APP = 'SET_APP';
const SET_CONNECT_CODE = 'SET_CONNECT_CODE';

export function setSessionCode(sessionCode) {
    return {
        type: SET_SESSION_CODE,
        sessionCode,
    }
}

export function setConnectCode(connectCode) {
    return {
        type: SET_CONNECT_CODE,
        connectCode,
    }
}

export function setApp(appName){
    return{
        type: SET_APP,
        appName
    }
}

const initialState = {
    sessionCode: null,
    openApps: {},
    data: null,
    connectCode: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_SESSION_CODE:
            return Object.assign({},state , {
                sessionCode: action.sessionCode,
                connectCode: null
            })
        case SET_CONNECT_CODE:
            return Object.assign({},state , {
                connectCode: action.connectCode,
            })
        case SET_SOCKET:
            return Object.assign({}, state, {
                socket: action.socket,
            })
        case SET_APP:
            var newApps = Object.assign({},state.openApps);
            if(newApps[action.appName]){
                delete newApps[action.appName]
            } else {
                newApps[action.appName] = action.appName;            
            }
            return Object.assign({}, state, {
                openApps: newApps
            })
        default:
            return state
    }
}