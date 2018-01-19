
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {TeamBar} from '../../components'

class TeamBarContainer extends Component {
    render() {
        return (
            <div className='teamBar'>
                <TeamBar {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps({dashboard,game}) {
    return {
        sessionCode: dashboard.sessionCode,
        teamOneScore: game.teamOneScore,
        teamTwoScore: game.teamTwoScore,
    }
}

export default connect(mapStateToProps)(TeamBarContainer);