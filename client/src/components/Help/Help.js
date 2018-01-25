
import React, {Component} from 'react'

import {HowToPlay} from '../../components'

import './help.css'

class Help extends Component {
    render() {
        return (
            <div className='helpContainer'> 
                <div className='helpBox'>
                    <div className='interactionHelpBox'>
                        <h1>Interaction</h1>
                        <div className='interactionDescription'>
                            <p>This screen should be casted onto a monitor or tv that all players can see</p>
                            <p>All navigation and interaction with this game is done through Google Assistant voice or chat</p>
                            <p>You can always pick up where you left off if you need to pause the conversation at any point.</p>
                        </div> 
                    </div>
                      
                    <div className='firstHelpBox'>
                        <HowToPlay />
                    </div>
                </div>
            </div>
        )
    }
}

export default Help