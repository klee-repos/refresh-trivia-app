
const SET_TEAMS = 'SET_TEAMS';
const SET_ROUND = 'SET_ROUND';

export function setTeams(roster) {
    return {
        type: SET_TEAMS,
        team1:roster.teamOne,
        team2:roster.teamTwo
    }
}

export function setRound(round) {
    let activeTeam;
    if (round.activeTeam === 'team1') {
        activeTeam = 'Team 1'
    } else {
        activeTeam = 'Team 2'
    }
    return {
        type: SET_ROUND,
        round: round.round,
        activeTeam: activeTeam,
        playerIndex: round.playerIndex
    }
}

const initialState = {
    teamOne: null,
    teamTwo:null,
    round: null,
    activeTeam: null,
    playerIndex: null
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_TEAMS:
            return Object.assign({},state , {
                teamOne: action.team1,
                teamTwo: action.team2,
            })
        case SET_ROUND:
            return Object.assign({},state , {
                round: action.round,
                activeTeam: action.activeTeam,
                playerIndex: action.playerIndex,
            })
        default:
            return state
    }
}