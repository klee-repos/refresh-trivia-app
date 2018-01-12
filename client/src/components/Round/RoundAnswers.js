
import React, {Component} from 'react'

class RoundAnswers extends Component {
    render() {
        return(
            <div className='roundAnswers'>
                <div className='answersRow'>
                    <div className='answersColumn'>
                    <span>answer 1</span>
                    </div>
                    <div className='answersColumn'>
                    <span>answer 2</span>
                    </div>
                </div>
                <div className='answersRow'>
                    <div className='answersColumn'>
                    <span>answer 3</span>
                    </div>
                    <div className='answersColumn'>
                    <span>answer 4</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoundAnswers;