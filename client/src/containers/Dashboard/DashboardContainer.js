import React from 'react';
import {Dashboard, NavBottom} from '../../components/'

class DashboardContainer extends React.Component {
    render() {
        return (
            <div>
            <Dashboard/>
            <NavBottom />
            </div>
        )  
    }
}

export default DashboardContainer;