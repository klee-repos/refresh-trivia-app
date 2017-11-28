
import React, {Component} from 'react'

class History extends Component {

    render() {
        return (
            <div>
                {this.props.priceHistory
                    ? <div>{this.props.priceHistory.map(function(item, idx) {
                        return (
                            <li key={idx}>
                                <div className='gdaxContainer'>
                                    <div className='gdaxRow'>
                                        <span>{item['diff']}</span>
                                    </div>
                                    <div className='gdaxRow'>
                                        {item['direction']
                                            ? <img src={require(`./img/${item['direction']}.png`)} alt={item[2]}/>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    })}</div>
                    : <div></div>
                }
            </div>
        )
    }
}

export default History;