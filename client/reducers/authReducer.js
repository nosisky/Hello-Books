import {
  UNAUTH_USER,
  SET_CURRENT_USER,
  EDIT_PROFILE,
  SET_API_STATUS
} from '../actions/ActionTypes';

const initialState = {
  userExist: '',
  error: '',
  apiStatus: false,
  message: '',
  user: {},
  content: '',
  authenticated: false
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function authReducer(state = initialState, action) {
  switch (action.type) {
    case UNAUTH_USER:
      return {
        ...state,
        error: '',
        user: {},
        message: 'Successfully Logged Out',
        authenticated: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user,
        authenticated: action.authenticated
      };
    case EDIT_PROFILE:
      return { ...state, user: action.user, authenticated: true };
    case SET_API_STATUS:
      return { ...state, apiStatus: action.apiStatus };
    default:
      return state;
  }
}

export default authReducer;
