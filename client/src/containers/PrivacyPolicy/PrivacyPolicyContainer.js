import React, {Component} from 'react'

import {PrivacyPolicy} from '../../components'

import {TopBarContainer} from '../../containers'

class PrivacyPolicyContainer extends Component {
    render() {
        return (
            <div className='mainPrivacyPolicy'>
                <TopBarContainer />
                <PrivacyPolicy />
            </div>
        )
    }
}

export default PrivacyPolicyContainer