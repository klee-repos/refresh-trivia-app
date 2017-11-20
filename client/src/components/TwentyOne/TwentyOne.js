
import React, {Component} from 'react';
import {Container, Header} from 'semantic-ui-react';

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
            <Container>
                {!this.state.cards
                    ? <Header as='h4' color='red' textAlign='center'>"Deal Cards"</Header>
                    : <Hand cards={this.state.cards}/>
                }
            </Container>
        )
    }

}

function mapStateToProps(state) {
    return {
        socket: state.socket,
    }
}

export default connect(mapStateToProps)(TwentyOne);