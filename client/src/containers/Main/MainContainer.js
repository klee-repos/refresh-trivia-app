import React from 'react';
import {NavBottom} from '../../components/';

//Socket.io
import SocketIOClient from 'socket.io-client';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard';

class MainContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            socket: null
        }

        if (window.location.hostname === 'localhost') {
            this.socket = SocketIOClient('http://localhost:8080');
            this.props.setSocket(this.socket);
        } else {
            this.socket = SocketIOClient(window.location.hostname);
            this.props.setSocket(this.socket);
        }

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
                this.props.setSessionCode(code);
                return {
                    sessionCode: code
                }
            })
        }.bind(this));

        this.socket.on('startTwentyOne', function() {
            this.startTwentyOne();
        }.bind(this))

        this.socket.on('stopTwentyOne', function() {
            this.stopTwentyOne();
        }.bind(this))

        this.startTwentyOne = this.startTwentyOne.bind(this);
        this.stopTwentyOne = this.stopTwentyOne.bind(this);
    }

    startTwentyOne() {
        this.props.setTwentyOne(true);
    }

    stopTwentyOne() {
        this.props.setTwentyOne(false);
    }

    render() {
        return (
            <div className='mainContainer'> 
                {this.props.children}
                <NavBottom />
            </div>
        )
    }
}

function mapStateToProps(){
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);