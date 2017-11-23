
const SET_GDAX = 'SET_GDAX';

function setGdax(active) {
    return {
        type: SET_GDAX,
        active,
    }
}

export function changeGdax(active) {
    return function (dispatch) {
        dispatch(setGdax(!active));
    }
}

const initialState = {
    gdax: false,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_GDAX:
            return {
                ...state,
                gdax: action.active,
            }
        default:
            return state
    }
}