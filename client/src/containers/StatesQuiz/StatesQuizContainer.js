
import React, {Component} from 'react'
import {connect} from 'react-redux';

import {StatesQuiz} from '../../components'

class StatesQuizContainer extends Component {

    constructor(props) {
        super(props)
        
        this.state = {}
    }

    render() {
        return (
            <div className='statesQuiz'>
                <StatesQuiz quizQuestion={this.props.quizQuestion} quizAnswers={this.props.quizAnswers} />
            </div>
        )
    }
}

function mapStateToProps({quiz}) {
    return {
        quizQuestion: quiz.quizQuestion,
        quizAnswers: quiz.quizAnswers,
    }
}

export default connect(mapStateToProps)(StatesQuizContainer);