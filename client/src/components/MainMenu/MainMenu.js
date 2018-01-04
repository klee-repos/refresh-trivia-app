
import React, {Component} from 'react'

import './mainMenu.css'

class MainMenu extends Component {

    render() {
        return(
            <div className='mainMenuContainer'>
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
                        <div className= 'tipTitle'>
                            <div className='tipIcon'>
                                <img className='infoIcon' src={require(`./img/info.png`)} alt='info'/>  
                            </div>
                            <div className='tipWords'>
                                <span>Tip</span>
                            </div>
                        </div>
                        <br />
                        <div className='tipDetails'>
                            <span className='tipInfo'>Use your Google device to interact with this game</span>
                            <br />
                            <br />
                            <span className='tipReg'>You can </span><span className='spoken'>Ask trivia flip...</span>
                            <br />
                            <br />
                            <span className='spoken'>"what are my stats?"</span>
                            <br/>
                            <span className='spoken'>"what are the rules?"</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu