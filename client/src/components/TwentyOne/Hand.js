
import React from 'react';

export default function Hand(props) {
    return (
            <div className='container'>
                <div className='row'>
                    <h4>Player</h4>  
                </div>
                <div className='row'>
                    {props.cards.playerHand.cards.map(function(card, idx) {
                        return (
                            <span key={idx}>
                                <img src={require(`./img/${card}.png`)} alt={card}/> 
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
                                <img src={require(`./img/${card}.png`)} alt={card}/> 
                            </span>
                        )   
                    })}
                </div>
                <div className='row'>
                    <div className='container'>
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