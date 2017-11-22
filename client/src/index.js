import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// Redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import dashboard from './redux/modules/dashboard';
import thunk from 'redux-thunk'

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(dashboard, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
