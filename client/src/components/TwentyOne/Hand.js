
import React from 'react';

export default function Hand(props) {
    console.log(props);
    return (
        <div className='twentyOne'>
            <div className='twentyOneContainer'>
            <div className='twentyOneRow'>
                <h4>Player</h4>  
                {props.cards.playerHand.cards.map(function(card, idx) {
                    return (
                        <span key={idx}>
                            <img src={require(`./img/${card}.png`)} alt={card}/> 
                        </span>
                    )
                })}
            </div>
            <div className='twentyOneRow'>
                <h4>Dealer</h4>
                {props.cards.dealerHand.cards.map(function(card, idx) {
                    return (
                        <span key={idx}>
                            <img src={require(`./img/${card}.png`)} alt={card}/> 
                        </span>
                    )   
                })}
            </div>
            <div className='twentyOneRow'>
                <span className='result'>
                    {!props.cards.result 
                        ? <div></div>
                        : <h4>{props.cards.result}</h4>
                }</span>
            </div>
        </div>
        </div>
    )
}