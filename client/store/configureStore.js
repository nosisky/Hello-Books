import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/index';

/* eslint-disable no-underscore-dangle */


/**
 *
 * @description - Redux store configuration
 * 
 * @param {Object}  initialState - inistial state
 * 
 * @returns {Object} - Object containing data in redux store
 */
export default function configureStore(initialState) {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk),
  );
}

/* eslint-enable */
