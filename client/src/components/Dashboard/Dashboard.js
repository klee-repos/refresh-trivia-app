import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Grid} from 'semantic-ui-react';

import {QuadrantLayout} from '../../layouts';

import {TwentyOneContainer} from '../../containers/';

import ColorBlock from '../TestApp/ColorBlock.js'


class Dashboard extends Component {

    render() {
        var style = {"minHeight":"100%"}
        return (
            <div style={style}>
                <QuadrantLayout apps={[TwentyOneContainer,ColorBlock,TwentyOneContainer,TwentyOneContainer]}/>
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