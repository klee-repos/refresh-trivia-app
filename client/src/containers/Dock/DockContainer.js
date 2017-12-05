
import React, {Component} from 'react'

import {TimeDateWidgetContainer, WeatherWidgetContainer} from '../../containers/'

import './dock.css'

class DockContainer extends Component { 
    render() {
        return (
            <div>
                <div className='dockContainer'>

                    <div className='timeDateWidgetDock'>
                        <TimeDateWidgetContainer />
                    </div>
                    <div className='weatherWidgetDock' >
                        <WeatherWidgetContainer />
                    </div>
                </div>
            </div>
        )
    }
}

export default DockContainer;