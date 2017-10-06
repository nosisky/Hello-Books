import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

/* eslint-disable no-underscore-dangle */

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

/* eslint-enable */
