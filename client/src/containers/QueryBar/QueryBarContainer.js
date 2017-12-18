
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {QueryBar} from '../../components'

import {VoiceRequests} from '../../requests'

const BrowserSpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition
const recognition = BrowserSpeechRecognition
    ? new BrowserSpeechRecognition()
    : null
const browserSupportsSpeechRecognition = recognition !== null
let listening
let interimTranscript = ''
let finalTranscript = ''

class QueryBarContainer extends Component {
      constructor(props) {
        super(props)

        this.state = {
          interimTranscript,
          finalTranscript,
          listening: false
        }

        document.addEventListener('keydown', (event) => {
            const keyCode = event.keyCode;
          
            if (keyCode === 192) {
                if (this.state.listening) {
                    this.stopListening()
                    return;
                }
                this.startListening()
                return;
            }
        }, false);

        this.stopListening = this.stopListening.bind(this)
        this.disconnect = this.disconnect.bind(this)
        this.startListening = this.startListening.bind(this)
        this.updateTranscript = this.updateTranscript.bind(this)
        this.onRecognitionDisconnect = this.onRecognitionDisconnect.bind(this)
        this.resetTranscript = this.resetTranscript.bind(this)

      }

      componentWillMount() {
        if (recognition) {
            listening = false
            recognition.continuous = false
            recognition.interimResults = true
            recognition.onresult = this.updateTranscript.bind(this)
            recognition.onend = this.onRecognitionDisconnect.bind(this)
            this.setState({ listening })
        }
      }

      disconnect(disconnectType) {
        if (recognition) {
          switch (disconnectType) {
            case 'ABORT':
              recognition.abort()
              this.resetTranscript()
              break
            case 'RESET':
              recognition.abort()
              this.resetTranscript()
              break
            case 'STOP':
            default:
              recognition.stop()
              this.resetTranscript()
          }
        }
      }

      onRecognitionDisconnect() {
        VoiceRequests.voiceInput(finalTranscript, this.props.sessionCode)
        this.stopListening()
        this.resetTranscript()
      }

      updateTranscript(event) {
        interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript = this.concatTranscripts(
              finalTranscript,
              event.results[i][0].transcript
            )
          } else {
            interimTranscript = this.concatTranscripts(
              interimTranscript,
              event.results[i][0].transcript
            )
          }
        }
        this.setState({ finalTranscript, interimTranscript})
      }

      concatTranscripts(...transcriptParts) {
        return transcriptParts.map(t => t.trim()).join(' ').trim()
      }

      resetTranscript() {
        interimTranscript = ''
        finalTranscript = ''
        this.setState({ interimTranscript, finalTranscript })
      }

      startListening() {    
        if (recognition && !listening) {
        try {
            recognition.start()
        } catch (DOMException) {
            // Tried to start recognition after it has already started - safe to swallow this error
        }
        listening = true
        this.setState({ listening })
        }
      }

      abortListening() {
        listening = false
        this.setState({ listening })
        this.disconnect('ABORT')
      }

      stopListening() {
        listening = false
        this.setState({ listening })
        this.disconnect('STOP')
      }

      render() {
        const transcript = this.concatTranscripts(
          finalTranscript,
          interimTranscript
        )

        return (
          <QueryBar
            resetTranscript={this.resetTranscript}
            startListening={this.startListening}
            abortListening={this.abortListening}
            stopListening={this.stopListening}
            transcript={transcript}
            recognition={recognition}
            browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
            {...this.state}
            {...this.props} />
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode
    }
}

export default connect(mapStateToProps)(QueryBarContainer)