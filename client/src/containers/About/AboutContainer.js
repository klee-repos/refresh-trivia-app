
import React, {Component} from 'react'

import {About} from '../../components'

import {TopBarContainer, InformationFooterContainer} from '../../containers'

class AboutContainer extends Component {
    render() {
        return (
            <div className='mainAbout'>
                <TopBarContainer />
                <About />
                <InformationFooterContainer />
            </div>
            
        )
    }
}

export default AboutContainer;