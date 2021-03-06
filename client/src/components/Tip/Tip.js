import React, {Component} from 'react'

import {SpokenContainer} from '../../containers'

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
                        {this.props.examplePhrases
                            ? this.props.examplePhrases.map(function(item, idx ) {
                                return (
                                    <SpokenContainer text={item} key={idx} />
                                )
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Tip;