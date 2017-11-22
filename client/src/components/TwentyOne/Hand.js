
import React from 'react';

export default function Hand(props) {
    return (
        <div className='container' style={{marginTop:'2em'}}>
            <div className='col-lg-12'>
                <div className='row'>
                    <h4>Player</h4>  
                </div>
                <div className='row'>
                    {props.cards.playerHand.cards.map(function(card, idx) {
                        return (
                            <span key={idx}>
                                <img src={require(`./img/${card}.png`)}/> 
                            </span>
                        )
                    })}
                </div>
                <div className='row'>
                    <h4>Dealer</h4>
                </div>
                <div className='row'>
                    {props.cards.dealerHand.cards.map(function(card, idx) {
                        return (
                            <span key={idx}>
                                <img src={require(`./img/${card}.png`)}/> 
                            </span>
                        )   
                    })}
                </div>
                <div className='row'>
                    <div className='col-lg-12'>
                    <span className='result'>
                        {!props.cards.result 
                            ? <div></div>
                            : <h4>{props.cards.result}</h4>
                    }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}