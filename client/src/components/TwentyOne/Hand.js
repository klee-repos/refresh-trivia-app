
import React from 'react';

import {Container, Grid, Header, Image} from 'semantic-ui-react';

export default function Hand(props) {
    return (
        <div>
            <Container style={{marginTop:'2em'}} fluid>
                <Grid columns={1} padded>
                    <Grid.Row>
                        <Header as='h4'>Player</Header>  
                    </Grid.Row>
                    <Grid.Row>
                        {props.cards.playerHand.cards.map(function(card, idx) {
                            return (
                                <div key={idx}>
                                    <Image src={require(`../img/${card}.png`)}/> 
                                </div>
                            )
                        })}
                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h4'>Dealer</Header>
                    </Grid.Row>
                    <Grid.Row>
                        {props.cards.dealerHand.cards.map(function(card, idx) {
                            return (
                                <div key={idx}>
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