
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Gdax} from '../../components/';

class GdaxComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sellPriceBTC: null,
            sellPriceETH: null,
            buyPriceBTC: null,
            buyPriceETH: null,
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
        this.setState(function() {
            if (type === 'sell') {
                return {
                    sellPriceBTC: parseFloat(price).toFixed(2),
                }
            } else {
                return {
                    buyPriceBTC: parseFloat(price).toFixed(2),
                }
            }
        })
    }

    setETH(type,price) {
        this.setState(function() {
            if (type === 'sell') {
                return {
                    sellPriceETH: parseFloat(price).toFixed(2),
                }
            } else {
                return {
                    buyPriceETH: parseFloat(price).toFixed(2),
                }
            }
        })
    }

    render() {
        return (
            <div className={this.props.layoutClass}>
                <Gdax 
                    sellPriceBTC={this.state.sellPriceBTC}
                    buyPriceBTC={this.state.buyPriceBTC}  
                    sellPriceETH={this.state.sellPriceETH}
                    buyPriceETH={this.state.buyPriceETH} 
                />
            </div>
        )
    }
}

function mapStateToProps({dashboard, gdax}) {
    return {
        socket: dashboard.socket,
        gdax: gdax.gdax,
    }
}

export default connect(mapStateToProps)(GdaxComponent);