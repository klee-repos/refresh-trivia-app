import React, {Component} from 'react';
import {connect} from 'react-redux';

import {QuadrantLayout, FullScreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';

class Dashboard extends Component {
    render() {
        return (
            <div className='container'>
                {!this.props.sessionCode
                    ? <h1>Loading...</h1>
                    : <div className='row'>
                        <FullScreenLayout apps={[TwentyOneContainer]}/>
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