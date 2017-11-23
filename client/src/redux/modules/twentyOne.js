

const SET_TWENTYONE = 'SET_TWENTYONE';

function setTwentyOne(active) {
    return {
        type: SET_TWENTYONE,
        active,
    }
}

export function changeTwentyOne(active) {
    return function (dispatch) {
        dispatch(setTwentyOne(!active));
    }
}

const initialTwentyOneState = {
    twentyOne: false,
}

export default function apps (state = initialTwentyOneState, action) {
    switch(action.type) {
        case SET_TWENTYONE:
            return Object.assign({}, state, {
                twentyOne: action.active,
            })
        default:
            return state
    }
}