
import React, {Component} from 'react'

import {QueryBar} from '../../components'

import {VoiceRequests} from '../../requests'

let interim_transcript = ''
let final_transcript = ''
let original = ''

class QueryBarContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            final_transcript: ''
        }

        var recognizing = false;
        var ignore_onend;
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onstart = function() {
            recognizing = true;
        }
        
        recognition.onerror = function(event) { 
            if (event.error === 'no-speech') {
            ignore_onend = true;
            }
            if (event.error === 'audio-capture') {
            ignore_onend = true;
            }
        }
        
        recognition.onend = function() {
            recognizing = false;
            if (ignore_onend) {
            return;
            }
            if (!this.state.final_transcript) {
            return;
            }
        }.bind(this)
        
        recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                    this.setState({final_transcript})
                    VoiceRequests.voiceInput(final_transcript)
                } else { 
                    original = interim_transcript
                    interim_transcript += event.results[i][0].transcript;
                }
                interim_transcript = interim_transcript.substring(original.length,)
            }
            
        }.bind(this)
    
        document.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode;
          
            if (keyCode === 32) {
              if (recognizing) {
                recognition.stop();
                return;
              }
              final_transcript = '';
              recognition.lang = 'en-US';
              recognition.start();
              ignore_onend = false;
              return;
            }
        }, false);

    }
    
    render() {
        return (
            <QueryBar {...this.state}/>
        )
    }
}

export default QueryBarContainer;