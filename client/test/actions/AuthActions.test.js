import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import fetchMock from 'fetch-mock';
import mockData from '../__mocks__/mockData';
import * as AuthActions from '../../actions/AuthActions';
import * as ActionTypes from '../../actions/types';
import localstorageMock from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

window.localStorage = new localstorageMock();

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
            type: ActionTypes.SET_CURRENT_USER,
            user
          }
      }
    };
    expect(AuthActions.setCurrentUser(user).user).toEqual(expectedAction.currentUser);
  });

  it('creates SET_CURRENT_USER when login action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signin', {
      status: 200,
      response: authResponse
    });

    const expectedActions = { type: ActionTypes.SET_CURRENT_USER, user: authResponse.currentUser };

    const store = mockStore({});
    store.dispatch(AuthActions.loginAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('creates SET_CURRENT_USER when signup action is successful', () => {
    const { authResponse } = mockData;
    moxios.stubRequest('/api/v1/users/signup', {
      status: 200,
      response: authResponse
    });

    const expectedActions = { type: ActionTypes.SET_CURRENT_USER,
      user: authResponse.currentUser };

    const store = mockStore({});
    store.dispatch(AuthActions.registerUserAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(error => error);
  });
});
