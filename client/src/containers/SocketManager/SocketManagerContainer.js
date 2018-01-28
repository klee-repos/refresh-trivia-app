
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as gameActionCreators from '../../redux/modules/game'

import socket from '../../config/socket';
import axios from 'axios'

import { Redirect } from 'react-router-dom'



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
            this.props.statusUpdate(gameEntity);
            this.props.setQuestion(question);
            this.props.setAnswers(answers);
        }.bind(this))

        // Team One
        socket.on('teamRoster', function(roster) {
            this.props.setTeams(roster);
        }.bind(this))

        // Round data
        socket.on('setRound', function(round) {
            this.props.setRound(round);
        }.bind(this))

        // Question data
        socket.on('setQuestion', function(question) {
            this.props.setQuestion(question)
        }.bind(this))

        // Set score
        socket.on('setScore', function(score) {
            this.props.setScore(score)
        }.bind(this))

        // Set winner
        socket.on('setWinner', function(winner) {
            this.props.setWinner(winner)
        }.bind(this))

        // Set GoTo
        socket.on('setGoTo', function(page) { 
            window.location.pathname = '/' + page;
        })

        socket.on('stealQuestion', function(stealQuestion) { 
            this.props.setStealQuestion(stealQuestion)
        }.bind(this))

    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }

}

function mapStateToProps({dashboard}) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            ...dashboardActionCreators,
            ...gameActionCreators,
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);