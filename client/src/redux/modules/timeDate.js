const SET_TIME = 'SET_TIME';
const SET_DATE = 'SET_DATE';

export function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}

export function setDate(date) {
    return {
        type: SET_DATE,
        date
    }
}

const initialState = {
    time: null,
    date: null,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_TIME:
            return {
                ...state,
                time: action.time
            }
        case SET_DATE:
            return {
                ...state,
                date: action.date
            }
        default:
            return state
    }
}