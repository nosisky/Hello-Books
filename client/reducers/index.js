import { combineReducers } from 'redux';  
import authReducer from './auth_reducer';

const rootReducer = combineReducers({  
  auth: authReducer,
});

export default rootReducer;
