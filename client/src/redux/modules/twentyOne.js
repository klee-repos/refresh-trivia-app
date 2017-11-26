
const SET_CARDS = 'SET_CARDS';


export function setCards(cards) {
    return {
        type: SET_CARDS,
        cards
    }
}

const initialState = {
    cards: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_CARDS:
            return {
                ...state,
                cards:action.cards
            }
        default:
            return state
    }
}