
var React = require('react');
var SocketIOClient = require('socket.io-client');

var TwentyOne = require('./TwentyOne');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null
        }

        this.socket = SocketIOClient('http://localhost:8080');

    }

    componentDidMount() {
        this.socket.on('connect', function(){
            console.log('Web browser connected');
            this.socket.emit('startSession', 'startSession');
        }.bind(this));
        this.socket.on('sessionCode', function(code){
            console.log("Session code is " + code);
            this.setState(function() {
                return {
                    sessionCode: code
                }
            })
        }.bind(this))
    }

    render() {
        return (
            <div>
                <TwentyOne sessionCode={this.state.sessionCode} Component={TwentyOne}/>
            </div>
        )
    }

}

module.exports = Dashboard;