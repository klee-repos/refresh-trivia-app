import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/'

import './Dashboard.css';

class Dashboard extends Component {
    render() {
        const _appMap = {
            "blackjack": TwentyOneContainer
        }
        var openApps = this.props.apps.map(function(app){return _appMap[app]});
        return (
            <div className='dashboard'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <QuadrantLayout apps={openApps}/> 
                }
            </div>
        )
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode,
        apps: dashboard.apps
    }
}

export default connect(mapStateToProps)(Dashboard);