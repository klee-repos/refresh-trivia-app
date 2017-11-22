

const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_SOCKET = 'SET_SOCKET';
const OPEN_TWENTYONE = 'OPEN_BLACKJACK';
const CLOSE_TWENTYONE = 'CLOSE_BLACKJACK';


export function setTwentyOne(active, appName) {
    if (active === true) {

        return {
            type: OPEN_TWENTYONE,
            active,
            appName
        }
    } else {
        return {
            type: CLOSE_TWENTYONE,
            active
        }
    }
}

export function setSessionCode(sessionCode) {
    return {
        type: SET_SESSION_CODE,
        sessionCode,
    }
}

export function setSocket(socket) {
    return {
        type: SET_SOCKET,
        socket,
    }
}

const initialState = {
    sessionCode: null,
    socket: null,
    twentyOne: false,
    apps: []
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case OPEN_TWENTYONE:
            state.apps.push(action.appName);
            return Object.assign({}, state, {
                twentyOne: true,
                apps: state.apps
            })
        case CLOSE_TWENTYONE:
            return Object.assign({}, state, {
                twentyOne: false,
            })
        case SET_SESSION_CODE:
            return Object.assign({},state , {
                sessionCode: action.sessionCode,
            })
        case SET_SOCKET:
            return Object.assign({}, state, {
                socket: action.socket,
            })
        
        default:
            return state
    }
}