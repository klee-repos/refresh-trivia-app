import React, {Component} from 'react';

import {Menu, Container, Icon} from 'semantic-ui-react';

class NavBottom extends Component {
    render() {
        return (
            <Menu fixed='bottom' borderless>
            <Container>
                <Menu.Menu position='right' style={{marginRight:'7em'}}>
                    <Menu.Item>
                        <Icon name='copyright' />Refresh Labs
                    </Menu.Item>
                </Menu.Menu>
            </Container>
          </Menu>
        )
    }
}

export default NavBottom;