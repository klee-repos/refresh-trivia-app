
import React, {Component} from 'react'

import {RoundTitleBar, RoundAnswers} from '../../components'

class RoundQuestion extends Component {
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundMessageBox'>
                    <div className='roundPlayer'>
                        <span>Gavin, for 2 points...</span>
                    </div>
                    <div className='roundQuestion'>
                        <span>What is the capital of Ohio?</span>
                    </div>
                    <RoundAnswers />
                </div>
            </div>
        )
    }
}

export default RoundQuestion