
import React, {Component} from 'react'

import {Panel} from 'react-bootstrap'

import History from './History';
import PriceTable from './PriceTable';

import './gdax.css'


class Gdax extends Component {

    render() {
        return (
                <div className='gdax'>
                    <PriceTable 
                        sellPriceHistoryBTC={this.props.sellPriceHistoryBTC}
                        buyPriceHistoryBTC={this.props.buyPriceHistoryBTC}
                        sellPriceHistoryETH={this.props.sellPriceHistoryETH}
                        buyPriceHistoryETH={this.props.buyPriceHistoryETH}
                    />

                    <div className='gdaxContainer'>

                        <div className='gdaxBTC' >
                            <Panel header="BTC" className='gdaxPanel'>
                                <div className='gdaxContainer'>
                                    
                                    <ul className='priceHistory'>
                                        <li><h5>Sell History</h5></li>
                                        <History priceHistory={this.props.sellPriceHistoryBTC} />
                                    </ul>
                                    <ul className='priceHistory'>
                                        <li><h5>Buy History</h5></li>
                                        <History priceHistory={this.props.buyPriceHistoryBTC} />
                                    </ul>
                                </div>
                            </Panel>
                        </div>

                        <div className = 'gdaxETH'>
                            <Panel header="ETH" className='gdaxPanel'>
                                <div className='gdaxContainer'>
                                    
                                    <ul className='priceHistory'>
                                        <li><h5>Sell History</h5></li>
                                        <History priceHistory={this.props.sellPriceHistoryETH} />
                                    </ul>
                                    <ul className='priceHistory'>
                                        <li><h5>Buy History</h5></li>
                                        <History priceHistory={this.props.buyPriceHistoryETH} />   
                                    </ul>
                                </div>
                            </Panel>
                        </div>

                    </div>

                </div>
        )
    }
}

export default Gdax;