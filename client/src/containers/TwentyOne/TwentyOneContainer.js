
import React, {Component} from 'react';

import {TwentyOne} from '../../components'

class TwentyOneContainer extends Component {

    render() {
        console.log(this.props.layoutClass)
        return (
            <div className={this.props.layoutClass}>
                <TwentyOne />
            </div>
        )
    }   
}

export default TwentyOneContainer;