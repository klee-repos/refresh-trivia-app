
const SET_TEAMS = 'SET_TEAMS';

export function setTeams(roster) {
    console.log(roster.team1)
    return {
        type: SET_TEAMS,
        team1:roster.team1,
        team2:roster.team2
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