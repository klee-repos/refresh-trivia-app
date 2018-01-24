
import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

import {SpokenContainer} from '../../containers'

import './finish.css'

class Finish extends Component { 
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                        ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                        : null
                    }
                <div className='finishBox'>
                    {this.props.winner
                        ? <div className='winner'>
                            <h1>{this.props.winner} you win!<span role='img' aria-label='steal'>&#x1f947;</span></h1>
                        </div>
                        : null
                    }
                    <SpokenContainer text="Go back to main menu" />
                    <SpokenContainer text="Start a new game" />
                </div>
            </div>
        )
    }
}

export default Finish