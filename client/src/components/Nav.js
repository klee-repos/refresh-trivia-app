
import React, {Component} from 'react';

import {Menu, Container, Icon, Header} from 'semantic-ui-react';

class Nav extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
        }

        this.handleItemClick=this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state;
        return (
            <Menu fixed='top' borderless size='large'>
            <Container>
                <Menu.Item>
                    {this.props.sessionCode && <span>Session code<Header as='h4' color='red'>{this.props.sessionCode}</Header></span>}
                </Menu.Item>
                <Menu.Menu position='right' style={{marginRight:'7em'}}>
                    <Menu.Item>
                        <Icon name='home' />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='setting' />
                    </Menu.Item>
                    <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
                        Logout
                    </Menu.Item>
                </Menu.Menu>
            </Container>    
          </Menu>
        )
    }

}

export default Nav;