
const SET_TEAMS = 'SET_TEAMS';
const SET_ROUND = 'SET_ROUND';
const SET_QUESTION = 'SET_QUESTION';
const SET_TEAM_ONE_SCORE = 'SET_TEAM_ONE_SCORE'
const SET_TEAM_TWO_SCORE = 'SET_TEAM_TWO_SCORE'
const SET_WINNER = 'SET_WINNER'

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
        playerIndex: round.playerIndex,
        questionIndex: round.questionIndex
    }
}

export function setQuestion(question) {
    return {
        type: SET_QUESTION,
        question: question.text,
        picklist: question.picklist,
        mediaURL: question.mediaURL
    }
}

export function setScore(score) {
    if (score.activeTeam === 'team1') {
        return {
            type: SET_TEAM_ONE_SCORE,
            score: score.score
        }
    } else {
        return {
            type:SET_TEAM_TWO_SCORE,
            score: score.score
        }
    }
}

export function setWinner(winner) {
    return {
        type: SET_WINNER,
        winner: winner
    }
}

const initialState = {
    teamOnePlayers: null,
    teamTwoScore: 0,
    teamTwoPlayers: null,
    teamOneScore: 0,
    round: null,
    activeTeam: null,
    playerIndex: null,
    questionIndex: null,
    question: null,
    picklist: null,
    mediaURL: null,
    winner: null,
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_TEAMS:
            return Object.assign({},state , {
                teamOnePlayers: action.team1,
                teamTwoPlayers: action.team2,
            })
        case SET_ROUND:
            return Object.assign({},state , {
                round: action.round,
                activeTeam: action.activeTeam,
                playerIndex: action.playerIndex,
                questionIndex: action.questionIndex
            })
        case SET_TEAM_ONE_SCORE:
            return Object.assign({},state , {
                teamOneScore: action.score
            })
        case SET_TEAM_TWO_SCORE:
            return Object.assign({},state , {
                teamTwoScore: action.score
            })
        case SET_QUESTION:
            return Object.assign({},state , {
                question: action.question,
                picklist: action.picklist,
                mediaURL: action.mediaURL,
            })
        case SET_WINNER:
            return Object.assign({}, state, {
                winner: action.winner
            })
        default:
            return state
    }
}