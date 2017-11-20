import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import dashboard from './redux/modules/dashboard';

import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(dashboard);
// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
