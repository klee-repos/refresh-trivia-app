
import React, {Component} from 'react'

import './statesQuiz.css'

class StatesQuiz extends Component {

    render() {
        return (
            <div className='statesQuizContainer'>
                <div className='question'>
                    <div className='questionTitle'>
                        <h1>{this.props.quizQuestion}</h1>
                    </div>
                </div>
                <div className='answer'>
                    <div className='answerBox'>
                        {this.props.quizAnswers.map(function(answer,idx) {
                            return (
                                <p key={idx}>{answer}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default StatesQuiz