import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BookReducer from './BookReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  book: BookReducer
});

export default rootReducer;
