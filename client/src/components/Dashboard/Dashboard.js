import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout} from '../../layouts';

import AppMap from '../../config/appMap'
import './Dashboard.css';

class Dashboard extends Component {

    render() {
        return (
            <div className='dashboard'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <QuadrantLayout blah={AppMap.getOpenApps(this.props.apps)}/> 
                }
            </div>
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode,
        apps: dashboard.openApps
    }
}

export default connect(mapStateToProps)(Dashboard);