
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

    }

    render() {
        return (
            <div className={this.props.layoutClass}>
                <Gdax 
                    sellPriceHistoryBTC={this.props.sellPriceHistoryBTC}
                    buyPriceHistoryBTC = {this.props.buyPriceHistoryBTC}
                    sellPriceHistoryETH={this.props.sellPriceHistoryETH}
                    buyPriceHistoryETH={this.props.buyPriceHistoryETH}
                />
            </div>
        )
    }
}

function mapStateToProps({gdax}) {
    return {
        sellPriceHistoryBTC: gdax.sellPriceHistoryBTC,
        buyPriceHistoryBTC: gdax.buyPriceHistoryBTC,
        buyPriceHistoryETH: gdax.buyPriceHistoryETH,
        sellPriceHistoryETH: gdax.sellPriceHistoryETH
    }
}

export default connect(mapStateToProps)(GdaxComponent);