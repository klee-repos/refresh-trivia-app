
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, DashboardContainer} from '../containers';


const routes = (
    <Router>
        <MainContainer>
            <Switch>
                <Route exact path='/' component={DashboardContainer} />
                <Route render={function() {
                return <p>Not Found</p>
                }} />
            </Switch>
        </MainContainer>
    </Router>
)

export default routes;