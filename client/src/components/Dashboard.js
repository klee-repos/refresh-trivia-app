var React = require('react');
var SocketIOClient = require('socket.io-client');

// Semantic UI
var Container = require('semantic-ui-react').Container;
var Grid = require('semantic-ui-react').Grid;
var Header = require('semantic-ui-react').Header;

var TwentyOne = require('./TwentyOne');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            cards: null,
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
        }.bind(this));
        this.socket.on('sessionCode', function(code){
            this.setState(function() {
                localStorage.setItem('sessionCode',code);
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
            <div>
                <Container style={{marginTop:'4em'}}>
                <Grid.Row>
                        {this.state.sessionCode && <span>Session code<Header as='h3' color='red'>{this.state.sessionCode}</Header></span>}
                </Grid.Row>
                <Grid.Row style={{marginTop:'1.5em'}}>
                    <Grid columns={2}>
                        <Grid.Column>
                        {!this.state.sessionCode
                            ? <p>Loading...</p>
                            : <TwentyOne 
                                sessionCode={this.state.sessionCode} 
                                cards = {this.state.cards}
                                Component={TwentyOne}
                            />
                        }
                        </Grid.Column>
                        <Grid.Column>
                            {!this.state.sessionCode
                                ? <p></p>
                                : <Header as='h3' color='grey'>App placeholder</Header>
                            }
                        </Grid.Column> 
                    </Grid>
                </Grid.Row>
                </Container>
            </div>
        )
    }

}

module.exports = Dashboard;