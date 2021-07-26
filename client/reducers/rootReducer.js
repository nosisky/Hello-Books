import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

const appReducer = combineReducers({
  auth: authReducer,
  book: bookReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'unauth_user') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
