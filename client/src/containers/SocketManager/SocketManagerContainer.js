
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as gdaxActionCreators from '../../redux/modules/gdax'
import * as twentyOneActionCreators from '../../redux/modules/twentyOne'
import * as iexActionCreators from '../../redux/modules/iex'
import * as hackerNewsActionCreators from '../../redux/modules/hackerNews'
import * as weatherActionCreators from '../../redux/modules/weather'

import socket from '../../config/socket';
import axios from 'axios'

class SocketManagerContainer extends Component {

    constructor(props) {
        super(props)

        this.state={
        };

        var connect = function(code){
            var sessionCode = code || localStorage.getItem('sessionCode');
            if(sessionCode) axios.defaults.headers['sessionCode'] = sessionCode;
            socket.emit('startSession', sessionCode);
        }
        // Dashboard
        socket.on('connect', connect);
        socket.on('reconnect', connect);

        socket.on('sessionCode', function(code){
            localStorage.setItem('sessionCode',code);
            this.props.setSessionCode(code);
            axios.defaults.headers['sessionCode'] = code;
        }.bind(this));

        socket.on('connectCode', function(code){
            this.props.setConnectCode(code);
        }.bind(this));

        // TwentyOne
        socket.on('updateCards', function(cards) {
            this.props.setCards(cards);
        }.bind(this))

        // GDAX exchange
        socket.on('sellPriceHistoryETH', function(data) {
            this.props.setSellPriceHistoryETH(data)
        }.bind(this))

        socket.on('buyPriceHistoryETH', function(data) {
            this.props.setBuyPriceHistoryETH(data)
        }.bind(this))

        socket.on('sellPriceHistoryBTC', function(data) {
            this.props.setSellPriceHistoryBTC(data)
        }.bind(this))

        socket.on('buyPriceHistoryBTC', function(data) {
            this.props.setBuyPriceHistoryBTC(data)
        }.bind(this))

        //IEX exchange
        socket.on('updateStockList', function(data) {
            this.props.setStockList(data)
        }.bind(this))

        // Hacker News
        socket.on('hackerNews-headlines', function(data) {
            this.props.setHeadlines(data)
        }.bind(this))

        // Dark Sky
        socket.on('weather', function(data){
            this.props.updateLocation(data);
            this.props.getForecast(data);
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
            ...gdaxActionCreators,
            ...twentyOneActionCreators,
            ...iexActionCreators,
            ...hackerNewsActionCreators,
            ...weatherActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);