
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
            {this.props.twentyOne
                ? <div className='twentyOneContainer'>
                    <div>
                    <h3>Twenty One</h3>
                    {!this.state.cards
                        ? <span className='alexa'>Deal Cards</span>
                        : <Hand cards={this.state.cards}/>
                    }
                    </div>
                </div>
                : <p></p>         
            }   
            </div>
        )
    }

}

function mapStateToProps({dashboard, twentyOne}) {
    return {
        socket: dashboard.socket,
        twentyOne: twentyOne.twentyOne
    }
}

export default connect(mapStateToProps)(TwentyOne);