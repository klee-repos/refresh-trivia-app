
import React, {Component} from 'react'

import {TipContainer} from '../../containers'

import RosterMenu from './RosterMenu'

import './rosterSetup.css';

class RosterSetup extends Component {
    render() {
        return (
            <div className='mainContainer'>
                <div className='mainLeft'>
                    <div className='rosterBox'>
                        <h1>Team Roster</h1>
                        <RosterMenu teamOne={this.props.teamOne} teamTwo={this.props.teamTwo}/>
                    </div>
                </div>
                <div className='mainRight'>
                    <div className='tipBox'>
                        <TipContainer currentPage='RosterSetup'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RosterSetup