
import React, {Component} from 'react'

import {TipContainer} from '../../containers'

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
                            <h1>Start a new game</h1>
                        </div>
                        <div className='joinGame'>
                            <h1>Join a game</h1>
                        </div>
                    </div>
                </div>
                <div className='mainRight'>
                    <div className='tipBox'>
                        <TipContainer currentPage='MainMenu' />
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu