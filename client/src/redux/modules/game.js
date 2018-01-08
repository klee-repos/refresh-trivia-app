
const SET_TEAM_ONE = 'SET_TEAM_ONE';
const SET_TEAM_TWO = 'SET_TEAM_TWO';


export function setTeamOne(roster) {
    return {
        type: SET_TEAM_ONE,
        roster,
    }
}

export function setTeamTwo(roster) {
    return {
        type: SET_TEAM_TWO,
        roster,
    }
}


const initialState = {
    teamOne: null,
    teamTwo:null,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_TEAM_ONE:
            return Object.assign({},state , {
                teamOne: action.roster
            })
        case SET_TEAM_TWO:
            return Object.assign({},state , {
                teamTwo: action.roster
            })
        default:
            return state
    }
}