
import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

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
                    {this.props.activeTeam 
                        ? <h1>{this.props.activeTeam} you're up! Good luck! <span role="img" aria-label="sunglasses">&#x1f60e;</span></h1>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default RoundStart