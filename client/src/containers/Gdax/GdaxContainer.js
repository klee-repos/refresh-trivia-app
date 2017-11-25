
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Gdax} from '../../components/';

class GdaxComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
 
            buyPriceHistoryBTC: [],
            sellPriceHistoryBTC: [],
            sellPriceHistoryETH: [],
            buyPriceHistoryETH: [],
        }

        this.props.socket.on('gdaxData', function(data) {
            if (data.product_id === 'BTC-USD') {
                this.setBTC(data.side, data.price)
            } else {
                this.setETH(data.side, data.price)
            }
        }.bind(this))

        this.setBTC = this.setBTC.bind(this);
        this.setETH = this.setETH.bind(this);

    }

    componentDidMount() {
        this.props.socket.emit("gdax-subscribe");
    }

    componentWillUnmount() {
        this.props.socket.emit('gdax-unsubscribe');
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
                return {
                    sellPriceHistoryBTC: newHistoryBTC
                }
            } else {
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
                return {
                    sellPriceHistoryETH: newHistoryETH
                }
            } else {
                return {
                    buyPriceHistoryETH: newHistoryETH
                }
            }
        })
    }

    render() {
        return (
            <div className={this.props.layoutClass}>
                <Gdax 
                    sellPriceHistoryBTC={this.state.sellPriceHistoryBTC}
                    buyPriceHistoryBTC = {this.state.buyPriceHistoryBTC}
                    sellPriceHistoryETH={this.state.sellPriceHistoryETH}
                    buyPriceHistoryETH={this.state.buyPriceHistoryETH}
                />
            </div>
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        socket: dashboard.socket,
    }
}

export default connect(mapStateToProps)(GdaxComponent);