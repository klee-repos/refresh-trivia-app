var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Refresh Labs
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/dashboard'>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/contact'>
                    Contact Us
                </NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav;