var React = require('react');

// Semantic UI
var Container = require('semantic-ui-react').Container;
var Grid = require('semantic-ui-react').Grid;
var Header = require('semantic-ui-react').Header;
var Image = require('semantic-ui-react').Image;

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
                                    <Image src={require(`../img/${card}.png`)}/> 
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
                                    <Image src={require(`../img/${card}.png`)}/> 
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
                <Container>
                    <Header as='h3' color='grey'>Twenty One </Header>
                        {!this.props.cards
                            ? <p>No hand</p>
                            : <Hand cards={this.props.cards}/>
                        }
                </Container>
            </div>
        )
    }

}

module.exports = TwentyOne;