import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer
});

export default rootReducer;
