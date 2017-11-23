
const SET_SESSION_CODE = 'SET_SESSION_CODE';
const SET_SOCKET = 'SET_SOCKET';

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

export function getAppFromName(name){

}

const initialState = {
    sessionCode: null,
    socket: null,
    apps: ["blackjack"]
}

export default function apps (state = initialState, action) {
    switch(action.type) {
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