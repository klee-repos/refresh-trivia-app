import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Grid} from 'semantic-ui-react';

import {TwentyOneContainer} from '../../containers/';


class Dashboard extends Component {
    render() {
        return (
            <Container style={{marginTop:'2em'}}>
            {!this.props.sessionCode
                ? <p>Loading...</p>
                : <Grid.Row style={{marginTop:'1.5em'}}>
                    <Grid columns={3}>
                    <Grid.Column>
                        <TwentyOneContainer />
                    </Grid.Column>
                    </Grid>
                </Grid.Row>
            }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
    }
}

export default connect(mapStateToProps)(Dashboard);