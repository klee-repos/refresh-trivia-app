
const SET_ETH_STATUS = 'SET_ETH_STATUS';
const SET_BUYPRICE_HISTORY_BTC = 'SET_BUYPRICE_HISTORY_BTC';
const SET_BTC_STATUS = 'SET_BTC_STATUS'
const SET_BUYPRICE_HISTORY_ETH = 'SET_BUYPRICE_HISTORY_ETH';


export function setBuyPriceHistoryBTC(buyPriceHistoryBTC) {
    return {
        type: SET_BUYPRICE_HISTORY_BTC,
        buyPriceHistoryBTC
    }
}

export function setBuyPriceHistoryETH(buyPriceHistoryETH) {
    return {
        type: SET_BUYPRICE_HISTORY_ETH,
        buyPriceHistoryETH
    }
}

export function setETHStatus(statusETH) {
    return {
        type: SET_ETH_STATUS,
        statusETH
    }
}

export function setBTCStatus(statusBTC) {
    return {
        type: SET_BTC_STATUS,
        statusBTC
    }
}

const initialState = {
    buyPriceHistoryBTC: null,
    buyPriceHistoryETH: null,
    statusETH: null,
    statusBTC: null,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_BTC_STATUS:
            return {
                ...state,
                statusBTC:action.statusBTC
            }
        case SET_BUYPRICE_HISTORY_BTC:
            return {
                ...state,
                buyPriceHistoryBTC:action.buyPriceHistoryBTC
            }
        case SET_ETH_STATUS:
            return {
                ...state,
                statusETH:action.statusETH
            }
        case SET_BUYPRICE_HISTORY_ETH:
            return {
                ...state,
                buyPriceHistoryETH:action.buyPriceHistoryETH
            }
        default:
            return state
    }
}