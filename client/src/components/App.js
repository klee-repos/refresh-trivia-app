
// React
import React, { Component } from 'react';

// React Router Dom
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

//Socket.io
import SocketIOClient from 'socket.io-client';

// Routes
import Dashboard from './Dashboard';
import NavBottom from './NavBottom';

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
                    {!this.state.sessionCode
                        ? <p>Loading</p>
                        : <Switch>
                            <Route exact path='/' render={() => (<Dashboard sessionCode={this.state.sessionCode} socket={this.state.socket}/>)} />
                            <Route render={function() {
                            return <p>Not Found</p>
                            }} />
                        </Switch>
                    }  
                    <NavBottom sessionCode={this.state.sessionCode}/>     
                </div>
            </Router>
        )
    }
}

export default App;
