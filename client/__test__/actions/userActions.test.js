import expect from 'expect';
import hammerjs from 'hammerjs';
import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dotenv from 'dotenv';
import mockData from '../__mocks__/mockData';
import { setCurrentUser,
  registerUserAction,
  editProfileAction,
  loginAction,
  googleLogin,
  logoutAction,
  getUserByEmailAction
} from '../../actions/UserActions';
import { SET_CURRENT_USER,
  EDIT_PROFILE,
  UNAUTH_USER
} from '../../actions/ActionTypes';

dotenv.load();

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = {
  removeItem: () => {},
  setItem: () => {}
};

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create SET_CURRENT_USER', () => {
    const user = {
      fullName: 'Abdulrasaq Nasirudeen',
      username: 'dealwap',
      email: 'nosisky@gmail.com',
    };

    const expectedAction = {
      decoded: {
        currentUser:
          {
            type: SET_CURRENT_USER,
            user,
            authenticated: true
          }
      }
    };

    expect(setCurrentUser(user))
      .toEqual(expectedAction.decoded.currentUser);
  });

  it('should create SET_CURRENT_USER when login action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: authResponse
    });

    const expectedActions = {
      type: SET_CURRENT_USER,
      user: authResponse.currentUser
    };

    const store = mockStore({});
    store.dispatch(loginAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should create SET_CURRENT_USER when Googlelogin action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: authResponse
    });

    const expectedActions = {
      type: SET_CURRENT_USER,
      user: authResponse.currentUser
    };

    const store = mockStore({});
    store.dispatch(googleLogin({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });


  it('should set UNAUTH_USER when user logs out of the application', () => {
    const expectedActions = {
      type: UNAUTH_USER,
      user: { },
      authenticated: false
    };

    const store = mockStore({});
    store.dispatch(expectedActions);
    expect(store.getActions()[0]).toEqual(expectedActions);
  });

  it('should create SET_CURRENT_USER when signup action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signup', {
      status: 200,
      response: authResponse
    });

    const expectedActions = {
      type: SET_CURRENT_USER,
      user: authResponse.currentUser
    };

    const store = mockStore({});
    store.dispatch(registerUserAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should create EDIT_PROFILE when user edit profile', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/edit/1', {
      status: 200,
      response: {
        token: process.env.testToken
      }

    });

    const expectedActions = {
      type: EDIT_PROFILE,
      user: authResponse.currentUser
    };

    const store = mockStore({});
    store.dispatch(editProfileAction(1, { fullName: 'james' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should fetch user details when supplied user email address', () => {
    moxios.stubRequest('/api/v1/search/email', {
      status: 200,
      response: {
        token: process.env.testToken
      }

    });

    const expectedActions = process.env.testToken;

    getUserByEmailAction('something@something.com')
      .then((response) => {
        expect(response).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('should catch response error when api call fails', () => {
    moxios.stubRequest('/api/v1/search/email', {
      status: 404,
      response: {
        message: 'email not found'
      }
    });

    getUserByEmailAction('something@something.com')
      .then(() => {})
      .catch(error => expect(error.response.message)
        .toEqual('email not found'));
  });
});
