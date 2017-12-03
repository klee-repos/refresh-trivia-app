
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as gdaxActionCreators from '../../redux/modules/gdax'
import * as twentyOneActionCreators from '../../redux/modules/twentyOne'
import * as iexActionCreators from '../../redux/modules/iex'
import * as timeDateActionCreators from '../../redux/modules/timeDate'
import * as hackerNewsActionCreators from '../../redux/modules/hackerNews'
import * as weatherActionCreators from '../../redux/modules/weather'

import socket from '../../config/socket';

class SocketManagerContainer extends Component {

    constructor(props) {
        super(props)

        this.state={
        };

        // Dashboard
        socket.on('connect', function(){
            socket.emit('startSession', localStorage.getItem('sessionCode'));
        });

        socket.on('sessionCode', function(code){
            localStorage.setItem('sessionCode',code);
            this.props.setSessionCode(code);
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

        // Time
        socket.on('time', function(data) {
            this.props.setTime(data)
        }.bind(this))

        socket.on('date', function(data) {
            this.props.setDate(data)
        }.bind(this))

        // Hacker News
        socket.on('hackerNews-headlines', function(data) {
            this.props.setHeadlines(data)
        }.bind(this))

        socket.on('weather', function(data){
            this.props.setWeatherLocation(data);
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
            ...timeDateActionCreators,
            ...hackerNewsActionCreators,
            ...weatherActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);