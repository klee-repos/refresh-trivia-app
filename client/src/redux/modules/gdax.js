
const SET_SELLPRICE_HISTORY_BTC = 'SET_SELLPRICE_HISTORY_BTC';
const SET_BUYPRICE_HISTORY_BTC = 'SET_BUYPRICE_HISTORY_BTC';
const SET_SELLPRICE_HISTORY_ETH = 'SET_SELLPRICE_HISTORY_ETH'
const SET_BUYPRICE_HISTORY_ETH = 'SET_BUYPRICE_HISTORY_ETH';

export function setSellPriceHistoryBTC(sellPriceHistoryBTC) {
    return {
        type: SET_SELLPRICE_HISTORY_BTC,
        sellPriceHistoryBTC
    }
}

export function setBuyPriceHistoryBTC(buyPriceHistoryBTC) {
    return {
        type: SET_BUYPRICE_HISTORY_BTC,
        buyPriceHistoryBTC
    }
}

export function setSellPriceHistoryETH(sellPriceHistoryETH) {
    return {
        type: SET_SELLPRICE_HISTORY_ETH,
        sellPriceHistoryETH
    }
}

export function setBuyPriceHistoryETH(buyPriceHistoryETH) {
    return {
        type: SET_BUYPRICE_HISTORY_ETH,
        buyPriceHistoryETH
    }
}

const initialState = {
    sellPriceHistoryBTC: null,
    buyPriceHistoryBTC: null,
    buyPriceHistoryETH: null,
    sellPriceHistoryETH: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_SELLPRICE_HISTORY_BTC:
            return {
                ...state,
                sellPriceHistoryBTC:action.sellPriceHistoryBTC
            }
        case SET_BUYPRICE_HISTORY_BTC:
            return {
                ...state,
                buyPriceHistoryBTC:action.buyPriceHistoryBTC
            }
        case SET_SELLPRICE_HISTORY_ETH:
            return {
                ...state,
                sellPriceHistoryETH:action.sellPriceHistoryETH
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