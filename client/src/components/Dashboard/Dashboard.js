import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Grid} from 'semantic-ui-react';

import {TwentyOneContainer} from '../../containers/';

import './Dashboard.css'

class Dashboard extends Component {
    render() {
        return (
            <Grid className="Dashboard" centered>
            {!this.props.sessionCode
                ? <p>Loading...</p>
                : <Grid.Row><TwentyOneContainer /></Grid.Row>
            }
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
    }
}

export default connect(mapStateToProps)(Dashboard);