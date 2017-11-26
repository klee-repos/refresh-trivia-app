
const SET_STOCKLIST = 'SET_STOCKLIST';


export function setStockList(stockList) {
    return {
        type: SET_STOCKLIST,
        stockList
    }
}

const initialState = {
    stockList: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_STOCKLIST:
            return {
                ...state,
                stockList:action.stockList
            }
        default:
            return state
    }
}