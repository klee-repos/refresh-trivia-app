
import React, {Component} from 'react'

import {TimeDateWidgetContainer, WeatherWidgetContainer} from '../../containers/'

import './dock.css'

class DockContainer extends Component { 
    render() {
        return (
            <div className='dockContainer'>
                <div className='timeDateWidgetDock'>
                    <TimeDateWidgetContainer />
                </div>
                <div className="dockSeparatorContainer">
                    <div className="dockSeparatorBox">
                        <div className="dockSeparatorLine"></div>
                    </div>
                </div>
                <div className='weatherWidgetDock' >
                    <WeatherWidgetContainer />
                </div>
            </div>
        )
    }
}

export default DockContainer;