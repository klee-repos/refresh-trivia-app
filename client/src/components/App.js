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

// Semantic UI
var Sidebar = require('semantic-ui-react').Sidebar;
var Segment = require('semantic-ui-react').Segment;
var Menu = require('semantic-ui-react').Menu;
var Header = require('semantic-ui-react').Header;

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} visible width='thin' vertical inverted>
                            <Menu.Item header>
                                <NavLink to='/'>
                                    <Header as='h3' color='yellow'>Refresh Labs</Header>
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
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment style={{height:'100vh'}}>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route path='/dashboard' component={Dashboard} />
                                    <Route path='/contact' component={Contact} />
                                    <Route render={function() {
                                    return <p>Not Found</p>
                                    }} />
                                </Switch>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>     
                </div>
            </Router>
        )
    }
}



export default App;
