
import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard'
import * as gdaxActionCreators from '../../redux/modules/gdax'

import socket from '../../config/socket';

class SocketManagerContainer extends Component {

    constructor(props) {
        super(props)

        this.state={

            buyPriceHistoryBTC: [],
            sellPriceHistoryBTC: [],
            sellPriceHistoryETH: [],
            buyPriceHistoryETH: [],

        };

        socket.on('connect', function(){
            socket.emit('startSession', localStorage.getItem('sessionCode'));
        });

        socket.on('sessionCode', function(code){
            localStorage.setItem('sessionCode',code);
            this.props.setSessionCode(code);
        }.bind(this));

        socket.on('gdaxData', function(data) {
            if (data.product_id === 'BTC-USD') {
                this.setBTC(data.side, data.price)
            } else {
                this.setETH(data.side, data.price)
            }
        }.bind(this))

        this.setBTC = this.setBTC.bind(this);
        this.setETH = this.setETH.bind(this);
    }

    setBTC(type,price) {
        var newHistoryBTC = [];
        var moveBTC;
        var differenceBTC;

        if (type === 'sell') {
            if (this.state.sellPriceHistoryBTC.length > 5) {
                newHistoryBTC = this.state.sellPriceHistoryBTC.slice(0,-1);
            } else {
                newHistoryBTC = this.state.sellPriceHistoryBTC.slice();
            }
        } else {
            if (this.state.buyPriceHistoryBTC.length > 5) {
                newHistoryBTC = this.state.buyPriceHistoryBTC.slice(0,-1);
            } else {
                newHistoryBTC = this.state.buyPriceHistoryBTC.slice();
            }
        }

        if (newHistoryBTC.length > 0) {
            differenceBTC = parseFloat(price) - parseFloat(newHistoryBTC[0]);
        } else {
            differenceBTC = 0;
        }

        if (differenceBTC > 0)
            moveBTC = 'up'
        if (differenceBTC < 0)
            moveBTC = 'down'

        if (differenceBTC === 0 && newHistoryBTC.length <= 1) {
            newHistoryBTC.unshift([parseFloat(price).toFixed(2), parseFloat(differenceBTC).toFixed(2),moveBTC]);
        }
        if (differenceBTC !== 0) {
            newHistoryBTC.unshift([parseFloat(price).toFixed(2), parseFloat(differenceBTC).toFixed(2),moveBTC]);
        }

        this.setState(function() {
            if (type === 'sell') {
                this.props.setSellPriceHistoryBTC(newHistoryBTC);
                return {
                    sellPriceHistoryBTC: newHistoryBTC
                }
            } else {
                this.props.setBuyPriceHistoryBTC(newHistoryBTC);
                return {
                    buyPriceHistoryBTC: newHistoryBTC
                }
            }
        })
    }

    setETH(type,price) {
        var newHistoryETH = [];
        var moveETH;
        var differenceETH;

        if (type === 'sell') {
            if (this.state.sellPriceHistoryETH.length > 5) {
                newHistoryETH = this.state.sellPriceHistoryETH.slice(0,-1);
            } else {
                newHistoryETH = this.state.sellPriceHistoryETH.slice();
            }
        } else {
            if (this.state.buyPriceHistoryETH.length > 5) {
                newHistoryETH = this.state.buyPriceHistoryETH.slice(0,-1);
            } else {
                newHistoryETH = this.state.buyPriceHistoryETH.slice();
            }
        }

        if (newHistoryETH.length > 0) {
            differenceETH = parseFloat(price) - parseFloat(newHistoryETH[0]);
        } else {
            differenceETH = 0;
        }

        if (differenceETH > 0)
            moveETH = 'up'
        if (differenceETH < 0)
            moveETH = 'down'

        if (differenceETH === 0 && newHistoryETH.length <= 1) {
            newHistoryETH.unshift([parseFloat(price).toFixed(2), parseFloat(differenceETH).toFixed(2),moveETH]);
        }
        if (differenceETH !== 0) {
            newHistoryETH.unshift([parseFloat(price).toFixed(2), parseFloat(differenceETH).toFixed(2),moveETH]);
        }
        
        this.setState(function() {
            if (type === 'sell') {
                this.props.setSellPriceHistoryETH(newHistoryETH);
                return {
                    sellPriceHistoryETH: newHistoryETH
                }
            } else {
                this.props.setBuyPriceHistoryETH(newHistoryETH);
                return {
                    buyPriceHistoryETH: newHistoryETH
                }
            }
        })
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
            ...gdaxActionCreators
        }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(SocketManagerContainer);