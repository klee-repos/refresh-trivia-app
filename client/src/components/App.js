import React, { Component } from 'react';


var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Switch = ReactRouter.Switch;
var Route = ReactRouter.Route;

// Routes
var Nav = require('./Nav');
var Home = require('./Home');
var Dashboard = require('./Dashboard');
var Contact = require('./Contact');

class App extends Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/contact' component={Contact} />
                        <Route render={function() {
                        return <p>Not Found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}



export default App;
