
import React, {Component} from 'react'

import {VoiceRequests} from '../../requests'

import './queryBar.css'

var newMessage = "Press Tilde to begin speaking...";


class QueryBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value:'',
        }

        this.setPlaceholder = this.setPlaceholder.bind(this);

        this.setVoice = this.setVoice.bind(this);

        this.setValue = this.setValue.bind(this)

        document.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode;
          
            if (keyCode === 13) {
                if (this.state.value) {
                    VoiceRequests.voiceInput(this.state.value, this.props.sessionCode)
                }
                return;
            }
        }, false);

        document.addEventListener('keyup', (event) => {
            const keyCode = event.keyCode;
          
            if (keyCode === 13) {
                if (this.state.value) {
                    this.setVoice();
                }
                return;
            }
        }, false);

    }

    setValue(evt) {
        this.setState({value:evt.target.value})
    }

    setPlaceholder(recognizing) {
        if (recognizing === 'listening') {
            return "Listening..."
        }
        if (recognizing === 'new') {
            return newMessage
        }
        if (recognizing === 'complete') {
            if (this.props.final_transcript === '') {
                return newMessage
            }
            return this.props.final_transcript
        }
    }

    setVoice() {
        this.setState({value:''})
    }

    render() {
        return (
            <nav className="navbar navbar-fixed-bottom">
                <div className="queryBar">
                    <div className="queryContainer">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="button">
                                    <img className='micIcon' src={require(`./img/mic.png`)} alt='mic'/>
                                </button>
                            </span>
                            <input type="text" className="form-control" placeholder={this.setPlaceholder(this.props.recognizing)} value={this.state.value} onChange={this.setValue}/>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default QueryBar;