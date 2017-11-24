
import React, {Component} from 'react';

import {TwentyOne} from '../../components'

class TwentyOneContainer extends Component {

    render() {
        return (
            <div className={this.props.layoutClass}>
                <TwentyOne />
            </div>
        )
    }   
}

export default TwentyOneContainer;