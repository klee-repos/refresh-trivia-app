
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {MainContainer, 
        DashboardContainer, 
        SocketManagerContainer, 
        PrivacyPolicyContainer,
        HelpContainer,
        AboutContainer} from '../containers';


const routes = (
    <Router>
        <Switch>
            <SocketManagerContainer>    
                <MainContainer> 
                    <Route exact path='/' component={DashboardContainer} />
                    <Route  path='/privacyPolicy' component={PrivacyPolicyContainer} />
                    <Route  path='/help' component={HelpContainer} />
                    <Route  path='/about' component={AboutContainer} />
                </MainContainer>
            </SocketManagerContainer>           
        </Switch>
    </Router>
)

export default routes;