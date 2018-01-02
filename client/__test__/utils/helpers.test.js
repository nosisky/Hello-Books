import moxios from 'moxios';
import expect from 'expect';
import hammerjs, { Hammer } from 'hammerjs';

import { checkUserExist, checkEmailExist } from '../../utils/validation';
import { getUserData } from '../../utils/authorization';
import mailSender from '../../utils/mailSender';
import { getUserByEmailAction } from '../../actions/UserActions';

const error = { response: { data: { message: 'Invalid username supplied' } } }
describe('Auth actions', () => {
  beforeEach(() => {
    moxios.install();
    global.Materialize = { toast: jest.fn(() => Promise.resolve(1)) };

  });

  afterEach(() => moxios.uninstall());

  it('Should get userData from the database', () => {
    moxios.stubRequest('/api/v1/users/getemail', {
      status: 200,
      response: { username: 'test', fullName: 'hello' }
    });

    const expectedActions = { username: 'test', fullName: 'hello' };

    getUserData('nosisky@gmail.com')
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error => error);
  });


  it('Should validate if username exists', () => {
    moxios.stubRequest('/api/v1/users/get', {
      status: 200,
      response: { message: 'Username already exists' }
    });

    const expectedActions = { message: 'Username already exists' };

    checkUserExist('nosisky')
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error => error);
  });


  it('Should return empty response if there is no username', () => {
    moxios.stubRequest('/api/v1/users/get', {
      status: 404,
      response:  error
    });

    const expectedActions = null

    checkUserExist('')
      .then(() => {})
      .catch(error => expect(error).toEqual(expectedActions));
  });

  it('Should validate if email exists', () => {
    moxios.stubRequest('/api/v1/users/getemail', {
      status: 200,
      response: { message: 'Email already exists' }
    });

    const expectedActions = { message: 'Email already exists' };

    checkUserExist('nosisky@gmail.com')
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('Should return false if email does not exist', () => {
    moxios.stubRequest('/api/v1/users/getemail', {
      status: 404,
      response: false
    });

    checkUserExist('hello@adele.com')
      .then(() => { })
      .catch(error => expect(error).toBeFalsy);
  });
  it('Should return true when mail is sent', () => {
    moxios.stubRequest('/api/v1/books/email', {
      status: 200,
      response: { message: true }
    });

    const expectedActions = { message: true };

    mailSender({
      subject: 'hello',
      sender: 'dealwap@gmail.com',
      message: 'plan upgrade'
    })
      .then((data) => {
        expect(data).toEqual(expectedActions);
      })
      .catch(error => error);
  });

  it('Should return false when mail is not sent', () => {
    moxios.stubRequest('/api/v1/books/email', {
      status: 400,
      response: { message: false }
    });

    const expectedActions = { message: false };

    mailSender({})
      .then(() => {})
      .catch(error => expect(error).toEqual(expectedActions));
  });

  it('Should return user data when email is supplied', () => {
    moxios.stubRequest('/api/v1/search/email', {
      status: 200,
      response: { user: {
        fullName: 'james o',
        username: 'jamesjohn',
        plan: 'silver'
      } }
    });

    const expectedActions = { user: {
      fullName: 'james o',
      username: 'jamesjohn',
      plan: 'silver'
    } };

    getUserByEmailAction('')
      .then(data => expect(data).toEqual(expectedActions))
      .catch(error => error);
  });
});
