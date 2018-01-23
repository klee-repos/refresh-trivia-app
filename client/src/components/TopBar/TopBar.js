
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

import './topBar.css'

import rfLabsLogo from '../../img/rflabs-logo-website.png'

class TopBar extends Component {
    render() {
        return (
            <div className="topBar">
                <div className="topBarContainer">
                    <div className='leftContainer'>
                        <div className='logo'>
                            <img className='rfLabsLogoIcon' src={rfLabsLogo} alt='rfLabsLogoIcon'/>
                            <span>Refresh Trivia</span>
                        </div>
                    </div>
                    <div className='rightContainer'>
                        <div className='home'>
                            <NavLink to='/'><span>Home</span></NavLink>
                        </div>
                        <div className='about'>
                            <NavLink to='/about'><span>About</span></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar;