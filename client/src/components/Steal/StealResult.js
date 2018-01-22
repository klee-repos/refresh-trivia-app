
import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

import './steal.css'

class StealResult extends Component {

    setWinningTeam = function(activeTeam, result) {
        if (result === 'Coins stolen!') {
            return activeTeam
        } else {
            if (activeTeam === 'Team 1') {
                return 'Team 2'
            } else {
                return 'Team 1'
            }
        }
    }

    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundResultBox'>
                    {this.props.result === 'Coins stolen!'
                        ? <div className='stealMessageBox'>
                            <div className='stealResult'>
                                <h1>{this.props.result} <span role='img' aria-label='party'>&#x1f389;</span></h1>
                            </div>
                            <div className='stealMessage'>
                                <h1>{this.props.coinTotal} coins to {this.setWinningTeam(this.props.activeTeam, this.props.result)}</h1>
                            </div>
                        </div>
                        : <div className='stealMessageBox'>
                            <div className='stealResult'>
                                <h1>{this.props.result} <span role='img' aria-label='incorrect'>&#x1f4A9;</span></h1>
                            </div>
                            <div className='stealMessage'>
                            <h1>{this.props.coinTotal} coins to {this.setWinningTeam(this.props.activeTeam, this.props.result)}</h1>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default StealResult