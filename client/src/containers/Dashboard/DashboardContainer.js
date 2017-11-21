import React from 'react';
import {Container} from 'semantic-ui-react'
import {Dashboard} from '../../components/'

class DashboardContainer extends React.Component {
    render() {
        return (
            <Container>
                <Dashboard/>
            </Container>
        )
    }
}

export default DashboardContainer;