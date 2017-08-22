import { AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AUTH_USER:
      return { state, error: '', message: 'Successfully registered', authenticated: true };
    case UNAUTH_USER:
      return { state, authenticated: false };
    case AUTH_ERROR:
      return { state, error: action.payload };
    default:
      return state;
  }
};
