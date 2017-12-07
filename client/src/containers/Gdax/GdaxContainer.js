
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Gdax} from '../../components/';

class GdaxComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className='gdax'>
                <Gdax {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps({gdax}) {
    return {
        buyPriceHistoryBTC: gdax.buyPriceHistoryBTC,
        buyPriceHistoryETH: gdax.buyPriceHistoryETH,
        statusETH: gdax.statusETH,
        statusBTC: gdax.statusBTC
    }
}

export default connect(mapStateToProps)(GdaxComponent);