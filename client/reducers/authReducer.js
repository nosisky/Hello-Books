import {
  UNAUTH_USER,
  SET_CURRENT_USER,
  EDIT_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
  userExist: '',
  error: '',
  message: '',
  user: { currentUser: { isadmin: 0 } },
  content: '',
  authenticated: false };

/**
 *
 * @param {Object} state - Default application state
 * 
 * @param {Object} action - Response from the API
 * 
 * @returns {Object} - Object containing new state
 */
function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNAUTH_USER:
      return { ...state,
        error: '',
        user: {},
        message: 'Successfully Logged Out',
        authenticated: false };
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
    case EDIT_PROFILE:
      return { ...state, user: action.user, authenticated: true };
    default:
      return state;
  }
}

export default authReducer;
