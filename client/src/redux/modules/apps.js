
const OPEN_BLACKJACK = 'OPEN_BLACKJACK';


export function openBlackjack() {
    return {
        type: OPEN_BLACKJACK,
    }
}

const initialAppState = {
    appList: true,
    blackjack: false,
}

export default function apps (state = initialAppState, action) {
    switch(action.type) {
        case OPEN_BLACKJACK:
            return Object.assign({}, state, {
                appList: false,
                blackjack: true,
            })
        default:
            return state
    }
}