import React, {Component} from 'react';
import {connect} from 'react-redux';
import Hand from './Hand';
import './twentyOne.css'

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
            <span>
                {this.props.twentyOne ?
                    <span>
                        <div className="twentyOne">
                            <div className="appHeading"><h3>Twenty One</h3></div>
                            <div>
                            {!this.state.cards
                                ? <div className='alexa'>Deal Cards</div>
                                : <Hand cards={this.state.cards}/>
                            }
                            </div>
                        </div>
                    </span>
                    : <div className= "twentyOne"></div>         
                }   
            </span>
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