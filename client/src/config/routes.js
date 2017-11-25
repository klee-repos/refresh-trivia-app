
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, DashboardContainer, HomeContainer, ExperimentContainer,SocketManagerContainer} from '../containers';


const routes = (
    <Router>
        <Switch>
            <SocketManagerContainer>
            <Route exact path='/' component={HomeContainer} />
            
            <MainContainer>
                <Route path='/dashboard' component={DashboardContainer} />
                <Route path='/experiment' component={ExperimentContainer} />
            </MainContainer>
            <Route render={function() {
            return <p>Not Found</p>
            }} />
            </SocketManagerContainer>
        </Switch>
    </Router>
)

export default routes;