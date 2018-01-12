
import React, {Component} from 'react'

import RoundTitleBar from './RoundTitleBar'

import './round.css'

class RoundStart extends Component {

    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundMessageBox'>
                    <h1>{this.props.activeTeam} you're up! Good luck!</h1>
                </div>
            </div>
        )
    }
}

export default RoundStart