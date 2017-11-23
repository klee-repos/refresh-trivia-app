import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer, GdaxContainer} from '../../containers/'

class Dashboard extends Component {
    render() {
        const _appMap = {
            "blackjack": TwentyOneContainer,
            "gdax": GdaxContainer
        }
        var openApps = this.props.apps.map(function(app){return _appMap[app]});
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <div className='row'>
                        <FullscreenLayout apps={openApps}/> 
                    </div>
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