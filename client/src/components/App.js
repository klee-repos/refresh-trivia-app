
// React
import React, { Component } from 'react';

// React Router Dom
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

//Socket.io
import SocketIOClient from 'socket.io-client';

// Semantic UI
import {Sidebar, Segment, Menu, Header, Icon} from 'semantic-ui-react';

// Routes
import Dashboard from './Dashboard';
import NavBottom from './NavBottom';
import Nav from './Nav';
import Contact from './Contact';
import Home from './Home';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            socket: null
        }

        if (window.location.hostname === 'localhost') {
            this.socket = SocketIOClient('http://localhost:8080');
        } else {
            this.socket = SocketIOClient(window.location.hostname);
        }
    }

    componentDidMount() {
        this.socket.on('connect', function(){
            this.socket.emit('startSession', localStorage.getItem('sessionCode'));
            this.setState(function() {
                return {
                    socket: this.socket
                }
            })
        }.bind(this));
        this.socket.on('sessionCode', function(code){
            this.setState(function() {
                localStorage.setItem('sessionCode',code);
                return {
                    sessionCode: code
                }
            })
        }.bind(this))
    }

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
                        {!this.state.sessionCode
                            ? <p>Loading</p>
                            : <Sidebar.Pusher>
                            <Nav sessionCode={this.state.sessionCode}/>
                            <Segment style={{height:'100vh'}} attached>
                                <Switch>
                                    <Route exact path='/' component={Home} />
                                    <Route path='/dashboard' render={() => (<Dashboard sessionCode={this.state.sessionCode} socket={this.state.socket}/>)} />
                                    <Route path='/contact' component={Contact} />
                                    <Route render={function() {
                                    return <p>Not Found</p>
                                    }} />
                                </Switch>
                            </Segment>
                            <NavBottom />
                            </Sidebar.Pusher> 
                        }  
                    </Sidebar.Pushable>     
                </div>
            </Router>
        )
    }
}

export default App;
