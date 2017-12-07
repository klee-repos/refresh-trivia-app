import React, {Component} from 'react';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import AppMap from '../../config/appMap'
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <FullscreenLayout openApps={AppMap.getOpenApps(this.props.apps)}/> 
            </div>
        )
    }
}
export default Dashboard;