
import React, {Component} from 'react'

import {RoundTitleBar, RoundAnswers} from '../../components'
import {CoinBarContainer} from '../../containers'

class RoundSteal extends Component {
    
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundMessageBox'>
                        <div className='roundPlayer'>
                            {this.props.activeTeam
                                ? <span>{this.props.activeTeam}, for the steal! <span role='img' aria-label='steal'>&#x1f47b;</span></span>
                                : null
                            }
                        </div>
                    <div className='roundQuestion'>
                        <span>{this.props.question}</span>
                    </div>
                    <RoundAnswers picklist={this.props.picklist}/>
                </div>
                <CoinBarContainer activeTeam={this.props.activeTeam} questionIndex={this.props.questionIndex}/>
            </div>
        )
    }
}

export default RoundSteal