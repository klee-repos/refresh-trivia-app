
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, DashboardContainer, HomeContainer, SocketManagerContainer} from '../containers';


const routes = (
    <Router>
        <Switch>
            <SocketManagerContainer>    
                <MainContainer> 
                    <Route exact path='/' component={HomeContainer} />
                    <Route path='/dashboard' component={DashboardContainer} />
                </MainContainer>
            </SocketManagerContainer>           
        </Switch>
    </Router>
)

export default routes;