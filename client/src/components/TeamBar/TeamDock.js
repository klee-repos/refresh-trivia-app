import React, {Component} from 'react'

import teamOneIcon from '../../img/teamOneIcon.png'
import teamTwoIcon from '../../img/teamTwoIcon.png'

class TeamDock extends Component {

    constructor(props) {
        super(props)

        this.state = {
            icon: null,
        };
    }

    componentDidMount() {
        if (this.props.team) {
            if (this.props.team === 'teamOne') {
                this.setState({icon:teamOneIcon})
            } else {
                this.setState({icon:teamTwoIcon})
            }
        }
    }

    render() {
        return (
            <div className={this.props.teamBox}>
                <div className='teamBarTeamIcon'>
                    <img className='teamIcon' src={this.state.icon} alt='teamIcon'/>
                </div>
                <div className ='teamBarTeamDetails'>
                    <div className='teamBarTeamName'>
                        <span>{this.props.teamName}</span>
                    </div>
                    <div className='teamBarTeamScore'>
                        <span>{this.props.teamPoints}  points</span>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default TeamDock