import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Grid} from 'semantic-ui-react';

import {QuadrantLayout, FullScreenLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';
import {ColorBlock} from '../'


class Dashboard extends Component {

    render() {
        return (
            <QuadrantLayout apps={[TwentyOneContainer,ColorBlock,TwentyOneContainer,TwentyOneContainer]}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
    }
}

export default connect(mapStateToProps)(Dashboard);