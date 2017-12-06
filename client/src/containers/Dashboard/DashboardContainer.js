import React from 'react';
import {Dashboard, NavBottom} from '../../components/'
import {DockContainer} from '../../containers/'

import './dashboard.css'

class DashboardContainer extends React.Component {
    render() {
        return (
            <div className='dashboard'>
            <DockContainer />
            <Dashboard/>
            <NavBottom />
            </div>
        )  
    }
}

export default DashboardContainer;