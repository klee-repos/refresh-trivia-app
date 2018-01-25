
import React, {Component} from 'react'

import './welcome.css'

class Welcome extends Component {
    render() {
        return (
            <div className="mainOne">
                <div className="welcomeBox">
                    <div className='instructions'>
                        <div className='instructionsBox'>
                            <span>Welcome! Use your Google Assistant </span>
                            <span><img className='gAssistantIcon' src={require(`./img/googleAssistant.png`)} alt='gAssistant'/></span>
                            <span> Or Home </span>
                            <span><img className='gHomeIcon' src={require(`./img/googleHome.png`)} alt='gHome'/></span>
                            <span> to interact with this game</span>
                        </div>
                    </div>
                    <div className="connectCode">
                        <div className='connectCodeBox'>
                            <div className='spoken'>
                                <div className='spokenBox'>
                                    <img className='speechBubble' src={require(`../../img/speech-bubble-small-inverse.png`)} alt='speechbubble'/>
                                </div>
                                <div className='spokenText'>
                                    
                                    <h1>Tell Refresh Trivia to connect to</h1>
                                    <h2>{this.props.connectCode}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;