var React = require('react');

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
            <span className='result'>
                {!props.cards.result 
                    ? <div></div>
                    : <div><h4>Results</h4><p>{props.cards.result}</p></div>
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