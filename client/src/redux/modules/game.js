
const SET_TEAMS = 'SET_TEAMS';

export function setTeams(roster) {
    return {
        type: SET_TEAMS,
        team1:roster.teamOne,
        team2:roster.teamTwo
    }
}

const initialState = {
    teamOne: null,
    teamTwo:null,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_TEAMS:
            return Object.assign({},state , {
                teamOne: action.team1,
                teamTwo: action.team2,
            })
        default:
            return state
    }
}