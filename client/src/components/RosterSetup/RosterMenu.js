
import React, {Component} from 'react'

class RosterMenu extends Component {
    render() {
        return (
            <div className='rosterMenu'>
                <div className='rosterMenuContainer'>
                    <div className='rosterMenuTeamsContainer'>
                        <div className='teamOneContainer'>
                            <div className='teamOne'>
                                Team 1
                            </div>
                        </div>
                        <div className='teamTwoContainer'>
                            <div className='teamTwo'>
                                Team 2
                            </div>
                        </div>
                    </div>
                    <div className='rosterMenuConfirmContainer'>
                        <div className='rosterMenuConfirmText'>
                            <span>"Confirm Roster!"</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default RosterMenu