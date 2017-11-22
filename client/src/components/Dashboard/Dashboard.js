import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullscreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';
import {ColorBlock} from '../'

class Dashboard extends Component {

    render() {
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <p>Loading...</p>
                    : <div className='row'>
                        <FullscreenLayout apps={[TwentyOneContainer]}/>
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