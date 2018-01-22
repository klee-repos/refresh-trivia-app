
import React, {Component} from 'react'

import './topBar.css'

class TopBar extends Component {
    render() {
        return (
            <div className="topBar">
                <div className="topBarContainer">
                    <div className='leftContainer'>
                        <div className='logo'>
                            <h1>Refresh Labs Trivia</h1>
                        </div>
                    </div>
                    <div className='rightContainer'>
                        <div className='info'>
                            <span>Home</span>
                        </div>
                        <div className='info'>
                            <span>About</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar;