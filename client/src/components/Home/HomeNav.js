
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


class HomeNav extends Component {

    render() {
        return (
            <div className='homeNavContainer'>
                <div className='logo'>
                    <h1>Refresh Labs</h1>
                </div>
                <div className='homeNav'>
                 <ul>                    
                    <li>
                        <NavLink to='/dashboard'><span>Dashboard</span></NavLink>
                    </li>
                    <li>Contact</li>
                    <li>Github</li>
                </ul>
                </div>
            </div>
        )
    }
}

export default HomeNav;