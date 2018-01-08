
import React, {Component} from 'react'

class RosterList extends Component {
    render() {
        return (
            <div className='teamContainer'>
                <div className={this.props.teamId}>
                    {this.props.teamName}
                </div>
                <div className='teamRoster'>
                    <ul>
                        {this.props.teamMembers
                            ? this.props.teamMembers.map(function(player, idx) {
                                return(
                                    <li key={idx}>{player}</li>
                                )
                            })
                            : null
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default RosterList;