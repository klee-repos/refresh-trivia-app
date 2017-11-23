
import React, {Component} from 'react'

class Gdax extends Component {

    render() {
        return (
            <div className="col-lg-4">
                <div className='gdax'>
                    <table className='table table-bordered'>
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
                            <td>${this.props.sellPriceBTC}</td>
                            <td>${this.props.buyPriceBTC}</td>
                        </tr>
                        <tr>
                            <td>ETH</td>
                            <td>${this.props.sellPriceETH}</td>
                            <td>${this.props.buyPriceETH}</td>
                        </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}

export default Gdax;