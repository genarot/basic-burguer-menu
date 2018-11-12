import React from 'react';
import ReactDOM from 'react-dom';
import  {BrowserRouter} from 'react-router-dom'

//Redux
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = (store) => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action)
            console.log('[Middleware] next state', store.getState())
            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
