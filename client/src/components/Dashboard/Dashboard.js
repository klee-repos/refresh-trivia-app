import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';

class Dashboard extends Component {
    render() {
        const appMap = {
            "blackjack": TwentyOneContainer
        }
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <div className='row'>
                        <FullscreenLayout apps={appMap[this.props.apps]}/> 
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