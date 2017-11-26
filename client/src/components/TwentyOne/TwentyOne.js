import React, {Component} from 'react';

import Hand from './Hand';
import './twentyOne.css'

class TwentyOne extends Component {

    render() {
        return (
            <div className='twentyOneContainer'>
                <div className='twentyOneRow'>
                <h3>Twenty One</h3>
                </div>
                <div className='twentyOneRow'>
                {this.props.cards
                    ? <Hand cards={this.props.cards}/>
                    : <p></p>
                }
                {console.log(this.props.cards)}
                </div>
            </div>
        )
    }

}

export default TwentyOne;