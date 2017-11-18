import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  USER_EXIST,
  SET_CURRENT_USER
} from '../actions/types';

const INITIAL_STATE = {
  userExist: '',
  error: '',
  message: '',
  user: { currentUser: { isadmin: 0 } },
  content: '',
  authenticated: false };

function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UNAUTH_USER:
      return { ...state, error: '', user: {}, message: 'Successfully Logged Out', authenticated: false };
    case SET_CURRENT_USER:
      return { ...state, user: action.user, authenticated: true };
    default:
      return state;
  }
}

export default AuthReducer;
