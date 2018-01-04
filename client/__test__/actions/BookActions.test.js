import { expect } from 'chai';
import hammerjs from 'hammerjs';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from '../__mocks__/mockData';
import * as BookActions from '../../actions/BookActions';
import * as ActionTypes from '../../actions/types';
import localstorageMock from '../__mocks__/mockLocalStorage';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = new localstorageMock();

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates ADD_BOOK when a new book is added', () => {
    moxios.stubRequest('/api/v1/books', {
      status: 201,
      response: { message: 'book added successfully' }
    });

    const expectedActions = [{
      type: ActionTypes.ADD_BOOK,
      message: 'book added successfully'
    }];

    const store = mockStore({});

    return store.dispatch(BookActions.addBookAction(mockData.bookData))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates GET_ALL_BOOKS when trying to get all books', () => {
    moxios.stubRequest('/api/v1/books/?page=1', {
      status: 201,
      response: mockData.returnedBook
    });

    const expectedActions = [{
      type: ActionTypes.GET_ALL_BOOKS,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.getAllBooksAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates DELETE_BOOK when a book is successfully deleted', () => {
    moxios.stubRequest('/api/v1/books/delete/1', {
      status: 201,
      response: 1
    });

    const expectedActions = [{ type: ActionTypes.DELETE_BOOK, data: 1 }];

    const store = mockStore({});
    return store.dispatch(BookActions.deleteBookAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates EDIT_BOOK when a book is successfully deleted', () => {
    moxios.stubRequest('/api/v1/books/1', {
      status: 201,
      response: mockData.modifiedBook
    });

    const expectedActions = [{
      type: ActionTypes.EDIT_BOOK,
      data: mockData.modifiedBook
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.modifyBookAction(mockData.bookData, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates ADD_CATEGORY when category is successfully added', () => {
    moxios.stubRequest('/api/v1/books/category', {
      status: 201,
      response: { name: 'science', description: 'Hello world' }
    });

    const expectedActions = [{
      type: ActionTypes.ADD_CATEGORY,
      data: { name: 'science', description: 'Hello world' }
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.addCategoryAction({
      name: 'science',
      description: 'Hello world'
    }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates GET_RENTED_BOOKS when trying to get rented books', () => {
    moxios.stubRequest('/api/v1/books/logs/1', {
      status: 201,
      response: mockData.returnedBook
    });

    const expectedActions = [{
      type: ActionTypes.ADD_CATEGORY,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.getRentedBooksAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates RETURN_RENTED_BOOK when returning a book', () => {
    moxios.stubRequest('/api/v1/users/1/books', {
      status: 201,
      response: mockData.returnedBook
    });

    const expectedActions = [{
      type: ActionTypes.RETURN_RENTED_BOOK,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.returnBook(1, 3))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates GET_CATEGORY when getting all category', () => {
    moxios.stubRequest('/api/v1/category', {
      status: 201,
      response: [{ name: 'science', description: 'Hello world' }]
    });

    const expectedActions = [{
      type: ActionTypes.RETURN_RENTED_BOOK,
      data: [{ name: 'science', description: 'Hello world' }]
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.getCategoryAction())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('creates SEARCH_BOOK when searching for books', () => {
    moxios.stubRequest('/api/v1/search', {
      status: 201,
      response: mockData.modifiedBook
    });

    const expectedActions = [{
      type: ActionTypes.SEARCH_BOOK,
      data: mockData.modifiedBook
    }];

    const store = mockStore({});
    return store.dispatch(BookActions.searchAction('test'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });
});
