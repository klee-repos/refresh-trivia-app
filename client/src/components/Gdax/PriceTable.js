
import React, {Component} from 'react'

class PriceTable extends Component {
    render() {
        return (
            <div className='gdaxContainer'>
                <div className='gdaxPrices'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Sell Price</th>
                                <th>Buy Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>BTC</td>
                            {this.props.sellPriceHistoryBTC
                                ? <td>${this.props.sellPriceHistoryBTC[0]['price']}</td>
                                : <td></td>
                            }
                            {this.props.buyPriceHistoryBTC
                                ? <td>${this.props.buyPriceHistoryBTC[0]['price']}</td>
                                : <td></td>
                            }
                        </tr>
                        <tr>
                            <td>ETH</td>
                            {this.props.sellPriceHistoryETH
                                ? <td>${this.props.sellPriceHistoryETH[0]['price']}</td>
                                : <td></td>
                            }
                            {this.props.buyPriceHistoryETH
                                ? <td>${this.props.buyPriceHistoryETH[0]['price']}</td>
                                : <td></td>
                            }
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default PriceTable;