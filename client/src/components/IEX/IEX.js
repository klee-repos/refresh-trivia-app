
import React, {Component} from 'react'

import './iex.css';


class IEX extends Component {

    render() {
        return (
            <div className='iex'>
            <div className='iexContainer'>
                {this.props.stockList
                    ? <table className='table'>
                        <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Company Name</th>
                            <th>Sector</th>
                            <th>Latest Price</th>
                            <th>YTD Change</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {this.props.stockList.map(function(stockItem, idx) {
                            return (
                                <tr key={idx}>
                                <td>{stockItem.symbol}</td>
                                <td>{stockItem.companyName}</td>
                                <td>{stockItem.sector}</td>
                                <td>${stockItem.latestPrice}</td>
                                <td>{stockItem.ytdChange}%</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    : <p>No stocks</p>
                }
                </div>
            </div>
        )
    }

}

export default IEX;