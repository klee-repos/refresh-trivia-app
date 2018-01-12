
import React, {Component} from 'react'

class RoundTitleBar extends Component {
    render() {
        return (
            <div className='roundBox' >
            {this.props.activeTeam === 'Team 1'
                ? <div className='roundTitleBar_TeamOne'>
                    <h1>Round {this.props.round}</h1>
                </div>
                : <div className='roundTitleBar_TeamTwo'>
                    <h1>Round {this.props.round}</h1>
                </div>
            }
            </div>
        )
    }
}

export default RoundTitleBar