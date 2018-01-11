import React, {Component} from 'react'

class Spoken extends Component {
    render() {
        return (
            <div className='spoken'>
                <div className='spokenBox'>
                    <img className='speechBubble' src={require(`../../img/speech-bubble-small.png`)} alt='speechbubble'/>
                </div>
                <div className='spokenText'>
                    <span>{this.props.text}</span>
                </div>
            </div>
        )
    }
}

export default Spoken;