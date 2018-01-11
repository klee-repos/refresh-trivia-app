
import React, {Component} from 'react'
import {connect} from 'react-redux';

import {RosterSetup} from '../../components'

import {Info} from '../../requests'

class RosterSetupContainer extends Component {

    componentDidMount() {
        Info.getRoster(this.props.sessionCode)
    }

    render() {
        return (
            <RosterSetup {...this.props} />
        )
    }
}

function mapStateToProps({dashboard, game}) {
    return {
        teamOne: game.teamOne,
        teamTwo: game.teamTwo,
        sessionCode: dashboard.sessionCode
    }
}

export default connect(mapStateToProps)(RosterSetupContainer);