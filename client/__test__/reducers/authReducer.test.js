import expect from 'expect';
import AuthReducer from '../../reducers/authReducer';
import { SET_CURRENT_USER,
  UNAUTH_USER,
} from '../../actions/ActionTypes';

describe('Auth Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      user: { }
    };
    const user = {
      currentUser: {
        userName: 'Dealwap',
        fullName: 'Abdulrasaq Nasirudeen',
        id: '1',
        email: 'nosisky@gmail.com'
      }
    };
    const action = {
      type: SET_CURRENT_USER,
      user,
      authenticated: true
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(true);
    expect(newState.user.currentUser.userName).toEqual('Dealwap');
    expect(newState.user.currentUser.email).toEqual('nosisky@gmail.com');
  });
  it('should return initial state for invalid action type', () => {
    const initialState = {
      authenticated: false,
      user: {
        currentUser: {
          userName: '',
          fullName: ''
        }
      }
    };
    const user = {
      currentUser: {
        userName: 'Dealwap',
        fullName: 'Abdulrasaq Nasirudeen',
        id: '1',
        email: 'nosisky@gmail.com'
      }
    };
    const action = {
      type: 'TEST',
      user
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.user.currentUser.userName).toEqual('');
  });
  it('Should return logged out successful for logged out user', () => {
    const initialState = {
      message: '',
    };
    const action = {
      type: UNAUTH_USER,
      user: {},
      authenticated: false
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(false);
    expect(newState.user).toEqual({});
    expect(newState.message).toEqual('Successfully Logged Out');
  });
});
