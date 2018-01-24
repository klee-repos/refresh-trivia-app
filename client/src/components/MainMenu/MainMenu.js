
import React, {Component} from 'react'

import {TipContainer, SpokenContainer, RulesContainer} from '../../containers'

import './mainMenu.css'

class MainMenu extends Component {

    render() {
        return(
            <div className='mainContainer'>
                <div className='mainLeft'>
                    <div className='mainMenuBox'>
                        <div className='adviceTitle'>
                            <span>Would you like to...</span>
                        </div>
                        <div className='newGame'>
                            <SpokenContainer text='Start a new game' />
                        </div>
                        <div className='joinGame'>
                            <SpokenContainer text='Join a game' />
                        </div>
                    </div>
                </div>
                <div className='mainRight'>
                    <div className='rulesContainer'>
                        <RulesContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu