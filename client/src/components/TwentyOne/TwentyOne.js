
import React, {Component} from 'react';

import {connect} from 'react-redux';

import Hand from './Hand';

class TwentyOne extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            cards: null,
        }

        this.props.socket.on('updateCards', function(cards) {
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
                {!this.state.cards
                    ? <h4>Deal Cards</h4>
                    : <Hand cards={this.state.cards}/>
                }
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

export default connect(mapStateToProps)(TwentyOne);