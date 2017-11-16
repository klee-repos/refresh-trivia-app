var React = require('react');
var SocketIOClient = require('socket.io-client');

function Hand(props) {
    return (
        <div>
            <h4>Player Hand</h4>
            {props.cards.playerHand.cards.map(function(card) {
                return (
                    <span className='hand' key={card}>
                        {card}
                    </span>
                )
            })}
            <h4>Dealer Hand</h4>
            {props.cards.dealerHand.cards.map(function(card) {
                return (
                    <span className='hand' key={card}>
                        {card}
                    </span>
                )
            })}
            <h4>Results</h4>
            <span className='result'>{props.cards.result !== null && 
                <p>{props.cards.result}</p>
            }</span>
        </div>
    )
}

class TwentyOne extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
          sessionCode: null
        }

        this.socket = SocketIOClient('http://localhost:8080');

        
    }

    render() {
        return (
            <div>
                <h3>Twenty One </h3>
                <div className='row'>
                    <p>The session id is {this.props.sessionCode}</p>
                </div>
                <div className='row'>
                    {!this.props.cards
                        ? <p>No hand</p>
                        : <Hand cards={this.props.cards}/>
                    }
                </div>
            </div>
        )
    }

}

module.exports = TwentyOne;