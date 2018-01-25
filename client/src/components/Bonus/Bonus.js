import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

import './bonus.css'

class Bonus extends Component {
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='bonusBox'>
                    {this.props.activeTeam
                        ? <div className='bonusMessage'>
                            <h1>{this.props.bonusWinner} you got 5 in a row<span role='img' aria-label='incorrect'>&#x1f525;</span></h1>
                            <h2>3600 coins!</h2>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default Bonus