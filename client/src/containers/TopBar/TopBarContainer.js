
import React, {Component} from 'react'

import {TopBar} from '../../components'

class TopBarContainer extends Component {
    render() {
        return (
            <TopBar {...this.props} />
        )
    }
}

export default TopBarContainer;