import React from 'react';
import ReactDOM from 'react-dom';

import routes from './config/routes';

// Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import dashboard from './redux/modules/dashboard';

import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

import {Button} from 'react-bootstrap'

const TestApp = function(props){
    return(
        <Button bsStyle="primary" bsSize="large">Large button</Button>
    )
}

const store = createStore(dashboard);
// console.log(store.getState());

ReactDOM.render(
    // <Provider store={store}>
        // {routes}
    // </Provider>,
    <TestApp />,
    document.getElementById('root')
);
registerServiceWorker();
