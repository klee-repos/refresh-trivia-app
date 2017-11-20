import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import apps from './redux/modules/apps';

import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(apps);
// console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
