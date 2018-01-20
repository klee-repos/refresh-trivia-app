
import React, {Component} from 'react'

import {CoinBar} from '../../components'

class CoinBarContainer extends Component {

    render() {
        
        return (
            <CoinBar {...this.props}/>
        )
    }
}

export default CoinBarContainer