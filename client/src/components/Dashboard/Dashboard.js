import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer, GdaxContainer} from '../../containers/'
import './Dashboard.css';

class Dashboard extends Component {

    render() {
        const _appMap = {
            "blackjack": TwentyOneContainer,
            "gdax": GdaxContainer
        }
        var openAppContainers = [];
        for(var _app in this.props.apps){
            openAppContainers.push(_appMap[_app]);
        }
        
        return (
            <div className='dashboard'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <QuadrantLayout blah={openAppContainers}/> 
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