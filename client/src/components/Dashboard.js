
var React = require('react');
var SocketIOClient = require('socket.io-client');

var TwentyOne = require('./TwentyOne');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            cards: null
        }

        if (window.location.hostname === 'localhost') {
            this.socket = SocketIOClient('http://localhost:8080');
        } else {
            this.socket = SocketIOClient(window.location.hostname);
        }
        
        console.log(window.location);

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
        this.socket.on('updateCards', function(cards) {
            console.log(cards);
            this.setState(function() {
                return {
                    cards: cards
                }
            })
        }.bind(this))
        
    }

    render() {
        return (
            <div className='container'>
                {!this.state.sessionCode
                    ? <p>Loading</p>
                    : <TwentyOne 
                        sessionCode={this.state.sessionCode} 
                        cards = {this.state.cards}
                        Component={TwentyOne}
                    />
                }
            </div>
        )
    }

}

module.exports = Dashboard;