
const SET_QUESTION = 'SET_QUESTION';
const SET_ANSWERS = 'SET_ANSWERS';


export function setQuestion(question) {
    return {
        type: SET_QUESTION,
        question,
    }
}

export function setAnswers(newAnswers) {
    return {
        type: SET_ANSWERS,
        newAnswers,
    }
}


const initialState = {
    quizQuestion: null,
    quizAnswers:[],
}

export default function apps (state = initialState, action) {
    switch(action.type) {
        case SET_QUESTION:
            return Object.assign({},state , {
                quizQuestion: action.question
            })
        case SET_ANSWERS:
            return Object.assign({},state , {
                quizAnswers: action.newAnswers
            })
        default:
            return state
    }
}