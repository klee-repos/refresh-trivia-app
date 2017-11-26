
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TwentyOne} from '../../components'

class TwentyOneContainer extends Component {

    render() {
        return (
            <div className={this.props.layoutClass}>
                <TwentyOne cards={this.props.cards}/>
            </div>
        )
    }   
}

function mapStateToProps({twentyOne}) {
    return {
        cards: twentyOne.cards
    }
}

export default connect(mapStateToProps)(TwentyOneContainer);