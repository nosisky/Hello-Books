import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducers/rootReducer';

/* eslint-disable no-underscore-dangle */

/**
 *
 * @description - Redux store configuration
 *
 * @param {Object}  initialState - inistial state
 *
 * @returns {Object} - Object containing data in redux store
 */
const configureStore = (() => createStore(
  rootReducers,
  compose(applyMiddleware(thunk))
)
);

export default configureStore;

/* eslint-enable */
