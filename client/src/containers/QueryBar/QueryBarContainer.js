
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {QueryBar} from '../../components'

import {VoiceRequests} from '../../requests'

let interim_transcript = ''
let final_transcript = ''
let original = ''

class QueryBarContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            final_transcript: '',
            recognizing: 'new'
        }

        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onstart = function() {
            this.setState({final_transcript:'',recognizing:'listening'})
        }.bind(this)
        
        recognition.onend = function() {
            this.setState({recognizing:'complete'})
        }.bind(this)
        
        recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                    VoiceRequests.voiceInput(final_transcript, this.props.sessionCode)
                    this.setState({final_transcript})
                } else { 
                    original = interim_transcript
                    interim_transcript += event.results[i][0].transcript;
                }
                interim_transcript = interim_transcript.substring(original.length,)
            }
        }.bind(this)
    
        document.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode;
          
            if (keyCode === 192) {
              if (this.state.recognizing === 'listening') {
                recognition.stop();
                return;
              }
              final_transcript = '';
              recognition.lang = 'en-US';
              recognition.start();
              return;
            }
        }, false);

    }
    
    render() {
        return (
            <QueryBar {...this.state} {...this.props}/>
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode
    }
}

export default connect(mapStateToProps)(QueryBarContainer);