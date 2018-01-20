
import React, {Component} from 'react'

import {SpokenContainer} from '../../containers'

class RoundAnswers extends Component {
    render() {
        return(
            <div className='roundAnswers'>
                    {this.props.picklist 
                        ? <div className='answersRow'>
                            {this.props.picklist.map(function(answer, idx) {
                                return (
                                    <div className='answersColumn' key={idx}>
                                        <SpokenContainer text={answer} />
                                    </div>
                                )
                            })}
                        </div>
                        : null
                    }
            </div>
        )
    }
}

export default RoundAnswers;