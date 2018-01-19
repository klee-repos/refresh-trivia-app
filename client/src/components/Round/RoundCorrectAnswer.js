
import React, {Component} from 'react'

import {RoundTitleBar} from '../../components'

import {SpokenContainer} from '../../containers'

class RoundCorrectAnswer extends Component {
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                        ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                        : null
                }
                <div className='correctContainer'>
                    <div className='correctTitleBox'>
                        <h1>Correct! {this.props.activeTeam} would you like to...</h1>
                    </div>
                    <div className='pointsBox'>
                        <div className='playNext'>
                            <div className='alignWithBar'>
                            <SpokenContainer text='Play next question'/>
                            </div>
                        </div>
                        <div className='pointBar'>
                            <img className='pointBarImg' src={require(`../../img/pointBar100.png`)} alt='pointBar'/>
                        </div>
                        <div className='bankPoints'>
                            <div className='alignWithBar'>
                                <SpokenContainer text='Bank coins' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default RoundCorrectAnswer