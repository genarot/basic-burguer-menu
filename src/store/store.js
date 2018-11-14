//Redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import burguerBuilderReducer from './reducers/burguerBuilder'
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';

const rootReducer = combineReducers({
    burguerBuilder: burguerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// Middlewares
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


const store = createStore(
                        rootReducer, 
                        compose(
                            applyMiddleware(thunk, logger)
                            // ,
                            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                        ));

export default store;