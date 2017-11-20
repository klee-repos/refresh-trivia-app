
import React, {Component} from 'react';
import {Container, Grid, Header, Image} from 'semantic-ui-react';

function Hand(props) {
    return (
        <div>
            <Container style={{marginTop:'2em'}} fluid>
                <Grid columns={1} padded>
                    <Grid.Row>
                        <Header as='h4'>Player</Header>  
                    </Grid.Row>
                    <Grid.Row>
                        {props.cards.playerHand.cards.map(function(card) {
                            return (
                                <div key={card}>
                                    <Image src={require(`./img/${card}.png`)}/> 
                                </div>
                            )
                        })}
                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h4'>Dealer</Header>
                    </Grid.Row>
                    <Grid.Row>
                        {props.cards.dealerHand.cards.map(function(card) {
                            return (
                                <div key={card}>
                                    <Image src={require(`./img/${card}.png`)}/> 
                                </div>
                            )   
                        })}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <span className='result'>
                            {!props.cards.result 
                                ? <div></div>
                                : <Header as='h4' color='purple'>{props.cards.result}</Header>
                        }</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
            </Container>
        </div>
    )
}

class TwentyOne extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            cards: null,
        }
    }

    componentDidMount() {
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
            <div>
                <Container>
                    <Header as='h3' color='grey'>Twenty One </Header>
                        {!this.state.cards
                            ? <p>No hand</p>
                            : <Hand cards={this.state.cards}/>
                        }
                </Container>
            </div>
        )
    }

}

export default TwentyOne;