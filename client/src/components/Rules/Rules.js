
import React, {Component} from 'react'

import './rules.css'

class Rules extends Component {
    render() {
        return (
            <div className='rulesBox'>
                <div className='theRules'>
                    <div className='theRulesTitle'>
                        <h1>How to play</h1>
                    </div>
                        <div className='rulesDescription'>
                            <p>
                                <span role='img' aria-label='stadium'>&#x1f3df;</span>
                                <span className='descriptionTitle'> GAMES </span>have 5 rounds and each round has 5 questions
                            </p>
                            <p>
                                <span role='img' aria-label='thermo'>&#x1f321;</span>
                                <span className='descriptionTitle'> QUESTIONS </span>incremently increase in difficulty and reward 
                            </p>
                            <p>
                                <span role='img' aria-label='incorrecrt'>&#x1f6ab;</span>
                                <span className='descriptionTitle'> INCORRECT ANSWERS </span> give the opposing team a chance to steal the coins earned by your team in the current round
                            </p>
                            <p>
                                <span role='img' aria-label='correct'>&#x1f3AF;</span>
                                <span className='descriptionTitle'> CORRECT ANSWERS </span> leads to a choice to
                                <span className='spokenDescription'> play</span>, attempt another question, or
                                <span className='spokenDescription'> bank</span>, ending your team's turn
                            </p>
                            <p>
                                <span role='img' aria-label='trophy'>&#x1f3c6;</span>
                                <span className='descriptionTitle'> WIN </span>by earning more coins than the opposing team at the end of 5 rounds
                            </p>
                        </div>
                </div>
            </div>
        )
    }
}

export default Rules