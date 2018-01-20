
import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

class RoundResult extends Component {

    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundResultBox'>
                    {this.props.result === 'Correct!'
                        ? <h1>{this.props.result} <span role='img' aria-label='correct'>&#x1f609;</span></h1>
                        : <h1>{this.props.result} <span role='img' aria-label='incorrect'>&#x1f4A9;</span></h1>
                    }
                </div>
            </div>
        )
    }
}

export default RoundResult