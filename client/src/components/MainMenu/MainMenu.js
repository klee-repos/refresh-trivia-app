
import React, {Component} from 'react'

import {SpokenContainer, RulesContainer} from '../../containers'

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
                            <div className ='joinSpoken'>
                            <SpokenContainer text='Join a game' />
                            </div>
                            <div className='underConstruction'>
                                <span className='contructionEmoji' role='img' aria-label='construction'>&#x1f6a7;</span>
                                <span className='comingSoon'> (Coming soon)</span>
                            </div>
                            
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