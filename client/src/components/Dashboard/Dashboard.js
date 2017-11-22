import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';
import {ColorBlock, TwentyOne} from '../'

class Dashboard extends Component {

    render() {
        const appMap = {
            "blackjack": TwentyOneContainer
        }
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <p>Loading...</p>
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