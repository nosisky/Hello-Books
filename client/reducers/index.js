import { combineReducers } from 'redux';  
import authReducer from './auth_reducer';
import bookReducer from './book_reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer
});

export default rootReducer;
