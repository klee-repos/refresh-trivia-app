var React = require('react');

// Semantic UI
var Menu = require('semantic-ui-react').Menu;
var Input = require('semantic-ui-react').Input;
var Container = require('semantic-ui-react').Container;
var Icon = require('semantic-ui-react').Icon;

class Nav extends React.Component {

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
            <Menu fixed='top' borderless>
            <Container>
                <Menu.Item
                    name='microphone'
                    active={activeItem === 'microphone'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='microphone' />
                </Menu.Item>
        
                <Menu.Item
                    name='beer'
                    active={activeItem === 'beer'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='beer' />
                </Menu.Item>
        
                <Menu.Item
                    name='envelope'
                    active={activeItem === 'envelope'}
                    onClick={this.handleItemClick}
                >
                    <Icon name='envelope' />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Icon name='setting' />
                    </Menu.Item>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
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

module.exports = Nav;