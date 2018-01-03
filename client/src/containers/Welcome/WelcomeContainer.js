
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Welcome} from '../../components'

class WelcomeContainer extends Component {
    render() {
        return(
            <Welcome {...this.props}/>
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        connectCode: dashboard.connectCode,
    }
}

export default connect(mapStateToProps)(WelcomeContainer);