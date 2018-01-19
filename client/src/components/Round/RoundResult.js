
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
                        ? <h1>{this.props.result} &#x1f609;</h1>
                        : <h1>{this.props.result} &#x1f613;</h1>
                    }
                </div>
            </div>
        )
    }
}

export default RoundResult