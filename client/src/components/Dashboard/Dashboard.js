import React, {Component} from 'react';

import {FullscreenLayout} from '../../layouts';

import AppMap from '../../config/appMap'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <FullscreenLayout openApps={AppMap.getOpenApps(this.props.apps)}/> 
            </div>
        )
    }
}
export default Dashboard;