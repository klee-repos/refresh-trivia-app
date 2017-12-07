
import React, {Component} from 'react'

import './gdax.css'

class Gdax extends Component {

    render() {

        return (
            <div className='gdaxContainer'>
                <div className="gdaxLargeDisplay">
                    <div className='gdaxBitcoin'>
                        <div className ='gdaxIcon'>
                            <img className='gdaxImageLarge' src={require(`./img/bitcoin.png`)} alt='bitcoin'/>
                        </div>
                        <div className='gdaxPrice'>
                            {this.props.buyPriceHistoryBTC ?<h1>${parseFloat(this.props.buyPriceHistoryBTC.price).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1> :null }
                        </div>
                    </div>
                    <div className='gdaxEthereum'>
                        <div className ='gdaxIcon'>
                            <img className='gdaxImageLarge' src={require(`./img/ethereum.png`)} alt='ethereum'/>
                        </div>
                        <div className='gdaxPrice'>
                            {this.props.buyPriceHistoryETH ?<h1>${parseFloat(this.props.buyPriceHistoryETH.price).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</h1> :null }
                        </div>
                    </div>
                </div>    
                <div className="gdaxSmallDisplay">
                <div className='gdaxTable'>
                <table>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><img className='gdaxTableImage' src={require(`./img/bitcoin.png`)} alt='bitcoinSmall'/></td>
                            <td><img className='gdaxTableImage' src={require(`./img/ethereum.png`)} alt='ethereumSmall'/></td>
                        </tr>
                        <tr>
                            <td className='gdaxTableLabel'>24 Hour Change</td>
                            {this.props.statusBTC ?<td className='gdaxTableNumbers'>{(((this.props.statusBTC.last - this.props.statusBTC.open) / this.props.statusBTC.open)*100).toFixed(2)}%</td> :<td></td>}
                            {this.props.statusETH ?<td className='gdaxTableNumbers'>{(((this.props.statusETH.last - this.props.statusETH.open) / this.props.statusETH.open)*100).toFixed(2)}%</td> :<td></td>}
                        </tr>

                        <tr>
                            <td className='gdaxTableLabel'>24 Hour High</td>
                            {this.props.statusBTC ?<td className='gdaxTableNumbers'>${parseFloat(this.props.statusBTC.high).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</td> :<td></td>}
                            {this.props.statusETH ?<td className='gdaxTableNumbers'>${parseFloat(this.props.statusETH.high).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</td> :<td></td>}
                        </tr>
                        <tr>
                            <td className='gdaxTableLabel'>24 Hour Low</td>
                            {this.props.statusBTC ?<td className='gdaxTableNumbers'>${parseFloat(this.props.statusBTC.low).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</td> :<td></td>}
                            {this.props.statusETH ?<td className='gdaxTableNumbers'>${parseFloat(this.props.statusETH.low).toLocaleString('en', {'minimumFractionDigits':2,'maximumFractionDigits':2})}</td> :<td></td>}
                        </tr>
                    </tbody>
                </table>
                </div>
                </div> 
            </div>  
        )
    }
}

export default Gdax;