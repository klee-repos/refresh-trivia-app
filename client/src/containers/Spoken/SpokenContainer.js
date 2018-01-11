
import React, {Component} from 'react'

import {Spoken} from '../../components'

class SpokenContainer extends Component {
    render() {
        return(
            <Spoken {...this.props} />
        )
    }
}

export default Spoken;