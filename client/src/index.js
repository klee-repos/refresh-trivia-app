import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// Redux
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

import './index.css';
import * as reducers from './redux/modules/';

const store = createStore(
    combineReducers(reducers), 
    compose(
        applyMiddleware(thunk),
        // ** THIS IS FOR DEVELOPMENT PURPOSES ONLY **
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
))

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
