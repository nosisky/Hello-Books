import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

/* eslint-disable no-underscore-dangle */
export default function configureStore(initialState = {}) {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk),
  );
}
/* eslint-enable */

