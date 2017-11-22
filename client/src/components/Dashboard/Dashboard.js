import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';
import {ColorBlock} from '../'

class Dashboard extends Component {

    render() {
        const appMap = {
            "blackjack": ColorBlock
        }
        var apps = appMap.blackjack;
        console.log(apps);
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <p>Loading...</p>
                    : <div className='row'>
                        <FullscreenLayout blah={{apps}}/>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
    }
}

export default connect(mapStateToProps)(Dashboard);