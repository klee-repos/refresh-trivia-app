import React, {Component} from 'react'

import TeamDock from './TeamDock'

import './teamBar.css'

class TeamBar extends Component {
    render() {
        return (
            <div className='teamBarContainer'>
                <div className='teamBarTeamContainer'>
                    <TeamDock teamBox='teamBarTeamOneBox' team='teamOne' teamName='Team 1' teamPoints={0} />
                </div>
                <div className='teamBarTeamContainer'>
                    <TeamDock teamBox='teamBarTeamTwoBox' team='teamTwo' teamName='Team 2' teamPoints={0} />
                </div>
            </div>
        )
    }
}

export default TeamBar;