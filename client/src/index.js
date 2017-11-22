import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// Redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import dashboard from './redux/modules/dashboard';
import thunk from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(dashboard, compose(
    applyMiddleware(thunk),
    // ** THIS IS FOR DEVELOPMENT PURPOSES ONLY **
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
