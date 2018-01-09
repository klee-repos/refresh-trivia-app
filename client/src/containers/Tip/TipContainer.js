import React, {Component} from 'react'

import {Tip} from '../../components'

var Promise = require('bluebird');

class TipContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstMessage: null,
            tipReg: null,
            wakePhrase: null,
            examplePhrases: null,
        };

        this.setInfo = this.setInfo.bind(this)
        this.getPhrases = this.getPhrases.bind(this);
    }

    getPhrases(currentPage) {
        return new Promise(function(resolve, reject) {
            let phrases;
            if (currentPage === 'RosterSetup') {
                phrases = ['add Kevin and Gavin to team 1', 'move Gavin to team 2']
            }
            if (currentPage === 'MainMenu') {
                phrases = ['what are my stats?', 'what is this game?']
            }
            resolve(phrases)
        })
    }

    setInfo(currentPage) {
        if (currentPage === 'RosterSetup') {
            this.getPhrases(currentPage).then(function(phrases) {
                this.setState({
                    firstMessage:"Use the following commands to interact with team rosters",
                    tipReg: "You can ",
                    wakePhrase: "Ask Trivia Flip to...",
                    examplePhrases:phrases
                })
            }.bind(this))
        }
        if (currentPage === 'MainMenu') {
            this.getPhrases(currentPage).then(function(phrases) {
                this.setState({
                    firstMessage:"Use your Google device to interact with this game",
                    tipReg: "You can ",
                    wakePhrase: "Ask Trivia Flip...",
                    examplePhrases:phrases
                })
            }.bind(this))
        }
    }

    componentDidMount() {
        if (this.props.currentPage) {
            this.setInfo(this.props.currentPage);
        }
    }

    render() {
        return (
            <Tip {...this.state} />
        )
    }
}

export default TipContainer;