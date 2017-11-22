import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/'
class Dashboard extends Component {
    render() {
        const _appMap = {
            "blackjack": TwentyOneContainer
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

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
        apps: state.apps
    }
}

export default connect(mapStateToProps)(Dashboard);