import React from 'react';
import {Dashboard, NavBottom} from '../../components/'
import {DockContainer} from '../../containers/'

class DashboardContainer extends React.Component {
    render() {
        return (
            <div>
            <DockContainer />
            <Dashboard/>
            <NavBottom />
            </div>
        )  
    }
}

export default DashboardContainer;