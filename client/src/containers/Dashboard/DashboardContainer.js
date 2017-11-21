import React from 'react';
import {Container} from 'semantic-ui-react'
import {Dashboard} from '../../components/'
 import './Dashboard.css'

class DashboardContainer extends React.Component {
    render() {
        return (
            <Container className="Dashboard">
                <Dashboard/>
            </Container>
        )
    }
}

export default DashboardContainer;