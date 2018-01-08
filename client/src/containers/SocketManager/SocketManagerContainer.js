
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as quizActionCreators from '../../redux/modules/quiz'
import * as gameActionCreators from '../../redux/modules/game'

import socket from '../../config/socket';
import axios from 'axios'

class SocketManagerContainer extends Component {

    constructor(props) {
        super(props)

        this.state={};

        var connect = function(code){
            var sessionCode = code || localStorage.getItem('sessionCode');
            if(sessionCode) axios.defaults.headers['sessionCode'] = sessionCode;
            socket.emit('startSession', sessionCode);
        }

        // Dashboard
        socket.on('connect', connect);
        socket.on('re-connect', connect);

        var openApp = function(app){
            this.props.setApp(app);
        }

        socket.on('openApp', openApp.bind(this));

        socket.on('sessionCode', function(code){
            localStorage.setItem('sessionCode',code);
            this.props.setSessionCode(code);
            this.props.statusUpdate("mainMenu");
            axios.defaults.headers['sessionCode'] = code;
        }.bind(this));

        socket.on('connectCode', function(code){
            this.props.setConnectCode(code);
        }.bind(this));

        // Set status
        socket.on('setStatus', function(status) {
            this.props.statusUpdate(status);
        }.bind(this))

        // Start game
        socket.on('startGame', function(gameEntity, question, answers) {
            console.log(question)
            this.props.statusUpdate(gameEntity);
            this.props.setQuestion(question);
            this.props.setAnswers(answers);
        }.bind(this))

        // Correct answer
        socket.on('correctAnswer', function(answers) {
            this.props.setAnswers(answers);
        }.bind(this))

        // Team One
        socket.on('teamRoster', function(roster) {
            this.props.setTeams(roster);
        }.bind(this))

    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }

}

function mapStateToProps({dashboard, quiz}) {
    return {
        quizAnswers: quiz.quizAnswers
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...dashboardActionCreators,
            ...quizActionCreators,
            ...gameActionCreators,
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);