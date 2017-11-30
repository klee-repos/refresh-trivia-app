const SET_HEADLINES = 'SET_HEADLINES';

export function setHeadlines(headlines) {
    return {
        type: SET_HEADLINES,
        headlines
    }
}

const initialState = {
    headlines: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_HEADLINES:
            return {
                ...state,
                headlines: action.headlines
            }
        default:
            return state
    }
}