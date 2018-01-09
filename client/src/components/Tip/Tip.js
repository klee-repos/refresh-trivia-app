import React, {Component} from 'react'

import './tip.css'

class Tip extends Component { 
    render() {
        return (
            <div className='tipBox'>
                <div className= 'tipTitle'>
                    <div className='tipIcon'>
                        <img className='infoIcon' src={require(`../../img/info.png`)} alt='info'/>  
                    </div>
                    <div className='tipWords'>
                        <span>Tip</span>
                    </div>
                </div>
                <div className='tipDetails'>
                    <div className='tipFirstSecion'>
                        <span className='tipInfo'>{this.props.firstMessage}</span>
                    </div>
                    <div className='tipSecondSection'>
                    <span className='tipReg'>{this.props.tipReg} </span><span className='wakeWords'>{this.props.wakePhrase}</span>
                    </div>
                    <div className='tipThirdSection'>
                        <ul className='spoken'>
                        {this.props.examplePhrases
                            ? this.props.examplePhrases.map(function(item, idx ) {
                                return (
                                    <li key={idx}>{item}</li>
                                )
                            })
                            : null
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tip;