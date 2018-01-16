
import React, {Component} from 'react'

import {RoundTitleBar, RoundAnswers} from '../../components'

class RoundQuestion extends Component {
    render() {
        return (
            <div className='mainOne'>
                {this.props.round
                    ? <RoundTitleBar round={this.props.round} activeTeam={this.props.activeTeam}/>
                    : null
                }
                <div className='roundMessageBox'>
                    {this.props.teamOne && this.props.teamTwo
                        ? <div className='roundPlayer'>
                            {this.props.activeTeam === 'Team 1'
                                ? <span>{this.props.teamOne[this.props.playerIndex]}, for {this.props.coinTotal} coins...</span>
                                : <span>{this.props.teamTwo[this.props.playerIndex]}, for {this.props.coinTotal} coins...</span>
                            }
                        </div>
                        : null
                    }
                    <div className='roundQuestion'>
                        <span>{this.props.question}</span>
                    </div>
                    <RoundAnswers picklist={this.props.picklist}/>
                </div>
            </div>
        )
    }
}

export default RoundQuestion