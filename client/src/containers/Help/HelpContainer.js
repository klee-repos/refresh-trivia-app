
import React, {Component} from 'react'

import {Help} from '../../components'

import {TopBarContainer} from '../../containers'

class HelpContainer extends Component {
    render() {
        return (
            <div className='mainHelp'>
                <TopBarContainer />
                <Help />
            </div>
        )
    }
}

export default HelpContainer