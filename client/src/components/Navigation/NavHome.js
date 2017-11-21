
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {Menu, Container, Icon, Header, Button} from 'semantic-ui-react';

class NavHome extends Component {

    render() {
        return (
            <Menu fixed='top' size='large' icon='labeled' inverted pointing secondary style={{marginTop:'1em'}}>
                <Container>
                    <Menu.Item><Header as='h2' color='olive'><Icon name='refresh'/>Refresh Labs</Header></Menu.Item>  
                    <Menu.Menu position='right'>
                        <Menu.Item active>
                        <NavLink to="/">Home</NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                        </Menu.Item>
                        <Menu.Item>
                            <NavLink to="/company">Company</NavLink>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }

}

export default NavHome;