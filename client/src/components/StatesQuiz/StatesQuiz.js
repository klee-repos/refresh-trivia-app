
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
                        {this.props.quizAnswers
                            ? this.props.quizAnswers.map(function(answer,rowIdx) {
                                return (
                                    <div className='answerRow' key={rowIdx}>
                                        {answer.map(function(item, columnIdx) {
                                            return (
                                                <div className='answerColumn' key={columnIdx}>{item}</div>
                                            )
                                        })}
                                    </div>
                                )
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default StatesQuiz