
import React, {Component} from 'react'

import './roundStart.css'

class RoundStart extends Component {
    render() {
        return (
            <div className='mainContainer'>
                <div className='mainOne'>
                    <div className='roundBox'>
                        <div className='roundTitleBar_TeamOne'>
                            <h1>Round 1</h1>
                        </div>
                    </div>
                    <div className='roundMessageBox'>
                        <h1>Team One you're up! Good luck!</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoundStart