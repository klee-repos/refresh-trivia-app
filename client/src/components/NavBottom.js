var React = require('react');

// Semantic UI
var Menu = require('semantic-ui-react').Menu;
var Container = require('semantic-ui-react').Container;
var Icon = require('semantic-ui-react').Icon;

class NavBottom extends React.Component {

    render() {
        return (
            <Menu fixed='bottom' borderless>
            <Container>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Icon name='home' />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name='copyright' />Refresh Labs
                    </Menu.Item>
                </Menu.Menu>
            </Container>
          </Menu>
        )
    }

}

module.exports = NavBottom;