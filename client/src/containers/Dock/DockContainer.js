
import React, {Component} from 'react'

import {TimeDateContainer} from '../../containers/'

import './dock.css'

class DockContainer extends Component { 
    render() {
        return (
            <div>
                <div className='dockContainer'>

                    <div className='timeDateWidgetDock'>
                        <TimeDateContainer />
                    </div>
                    <div className='weatherWidgetDock' >
                    asdf
                    </div>
                </div>
            </div>
        )
    }
}

export default DockContainer;