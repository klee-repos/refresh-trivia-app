var React = require('react');
var NavLink = require('react-router-dom').NavLink;

var Container = require('semantic-ui-react').Container;
var Menu = require('semantic-ui-react').Menu;

function Nav() {
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <NavLink to='/'>
                            Refresh Labs
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to='/dashboard'>
                            Dashboard
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <NavLink to='/contact'>
                            Contact Us
                        </NavLink>
                    </Menu.Item>    
                </Container>
            </Menu>        
        </div>
    )
}

module.exports = Nav;