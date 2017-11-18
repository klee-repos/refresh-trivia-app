import React, { Component } from 'react';

// React Router Dom
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Switch = ReactRouter.Switch;
var Route = ReactRouter.Route;
var NavLink = require('react-router-dom').NavLink;

// Routes
var Home = require('./Home');
var Dashboard = require('./Dashboard');
var Contact = require('./Contact');
var Nav = require('./Nav');
var NavBottom = require('./NavBottom');

// Semantic UI
var Sidebar = require('semantic-ui-react').Sidebar;
var Segment = require('semantic-ui-react').Segment;
var Menu = require('semantic-ui-react').Menu;
var Header = require('semantic-ui-react').Header;
var Icon = require('semantic-ui-react').Icon;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} visible width='thin' vertical inverted>
                                    <Menu.Item> 
                                    <NavLink to='/'>
                                    <Header as='h3' color='olive'>
                                        <Icon name='refresh' />
                                        <Header.Content>
                                            Refresh Labs
                                        </Header.Content>
                                    </Header>
                                    </NavLink>
                                    </Menu.Item> 
                                    <Menu.Item>
                                        <NavLink to='/dashboard'>
                                            <Header as='h4' inverted>Dashboard</Header>
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to='/contact'>
                                            <Header as='h4' inverted>Contact Us</Header>
                                        </NavLink>
                                    </Menu.Item>
                            
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Nav />
                            <Segment style={{height:'100vh'}} attached>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route path='/dashboard' component={Dashboard} />
                                    <Route path='/contact' component={Contact} />
                                    <Route render={function() {
                                    return <p>Not Found</p>
                                    }} />
                                </Switch>
                            </Segment>
                            <NavBottom />    
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>     
                </div>
            </Router>
        )
    }
}



export default App;
