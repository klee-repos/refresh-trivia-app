
import React, {Component} from 'react'

import './welcome.css'

class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <div className="welcomeContainer">
                    <div className='instructions'>
                        <div className='instructionsBox'>
                            <span>Welcome! Use your Google Assistant </span>
                            <span><img className='gAssistantIcon' src={require(`./img/googleAssistant.png`)} alt='gAssistant'/></span>
                            <span> Or Home </span>
                            <span><img className='gHomeIcon' src={require(`./img/googleHome.png`)} alt='gHome'/></span>
                            <br />
                            <span>to interact with this game</span>
                        </div>
                    </div>
                    <div className="connectCode">
                        <div className='connectCodeBox'>
                            <span>"Tell Trivia Flip to connect to code {this.props.connectCode}"</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;