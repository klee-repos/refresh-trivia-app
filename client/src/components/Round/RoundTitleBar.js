
import React, {Component} from 'react'

class RoundTitleBar extends Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.setRound = this.setRound.bind(this)
    }

    setRound(round) {
        let result;
        if (round === 6) {
            return 'Game Over'
        } else {
            result = 'Round ' + round
            return result
        }
    }

    render() {
        return (
            <div className='roundBox' >
                {this.props.activeTeam === 'Team 1'
                    ? <div className='roundTitleBar_TeamOne'>
                        <h1>{this.setRound(this.props.round)}</h1>
                    </div>
                    : <div className='roundTitleBar_TeamTwo'>
                        <h1>{this.setRound(this.props.round)}</h1>
                    </div>
                }
            </div>
        )
    }
}

export default RoundTitleBar