
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart} from '../../components'

class RoundStartContainer extends Component {
    render() {
        return (
            <RoundStart />
        )
    }
}

function mapStateToProps({game}) {
    return {
        round: game.round,
        team: game.team,
    }
}

export default connect(mapStateToProps)(RoundStartContainer)