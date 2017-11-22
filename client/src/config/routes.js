
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, DashboardContainer, HomeContainer} from '../containers';


const routes = (
    <Router>
        <Switch>
            <Route exact path='/' component={HomeContainer} />
            <MainContainer>
                <Route path='/dashboard' component={DashboardContainer} />
            </MainContainer>
            <Route render={function() {
            return <p>Not Found</p>
            }} />
        </Switch>
    </Router>
)

export default routes;