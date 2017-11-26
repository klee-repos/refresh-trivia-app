
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, DashboardContainer, HomeContainer, ExperimentContainer,SocketManagerContainer} from '../containers';


const routes = (
    <Router>
        <Switch>
            <Route exact path='/' component={HomeContainer} />
                <MainContainer>
                    <SocketManagerContainer>
                        <Route path='/dashboard' component={DashboardContainer} />
                        <Route path='/experiment' component={ExperimentContainer} />
                        <Route render={function() {
                            return <h2>Not Found</h2>
                        }} />
                    </SocketManagerContainer>
                </MainContainer>
        </Switch>
    </Router>
)

export default routes;