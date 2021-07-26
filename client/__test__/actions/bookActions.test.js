import { expect } from 'chai';
import hammerjs from 'hammerjs';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from '../__mocks__/mockData';
import {
  addBookAction,
  getAllBooksAction,
  deleteBookAction,
  modifyBookAction,
  getRentedBooksAction,
  getAllNotifications,
  getCategoryAction,
  returnBook,
  searchAction,
  addCategoryAction,
  rentBookAction
} from '../../actions/BookActions';

import { ADD_BOOK,
  GET_ALL_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  GET_ALL_NOTIFICATIONS,
  SEARCH_BOOK,
  RETURN_RENTED_BOOK,
  ADD_CATEGORY,
  RENT_BOOK
} from '../../actions/ActionTypes';

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

window.localStorage = {};

describe('Book actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create ADD_BOOK when a new book is added', () => {
    moxios.stubRequest('/api/v1/books', {
      status: 201,
      response: { message: 'book added successfully' }
    });

    const expectedActions = [{
      type: ADD_BOOK,
      message: 'book added successfully'
    }];

    const store = mockStore({});

    return store.dispatch(addBookAction(mockData.bookData))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create GET_ALL_BOOKS when trying to get all books', () => {
    moxios.stubRequest('/api/v1/books/?page=1', {
      status: 201,
      response: mockData.returnedBook
    });

    const expectedActions = [{
      type: GET_ALL_BOOKS,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    return store.dispatch(getAllBooksAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create DELETE_BOOK when a book is successfully deleted', () => {
    moxios.stubRequest('/api/v1/books/delete/1', {
      status: 201,
      response: 1
    });

    const expectedActions = [{ type: DELETE_BOOK, data: 1 }];

    const store = mockStore({});
    return store.dispatch(deleteBookAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create EDIT_BOOK when a book is successfully deleted', () => {
    moxios.stubRequest('/api/v1/books/1', {
      status: 201,
      response: mockData.modifiedBook
    });

    const expectedActions = [{
      type: EDIT_BOOK,
      data: mockData.modifiedBook
    }];

    const store = mockStore({});
    return store.dispatch(modifyBookAction(mockData.bookData, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create ADD_CATEGORY when category is successfully added', () => {
    moxios.stubRequest('/api/v1/books/category', {
      status: 201,
      response: { name: 'science', description: 'Hello world' }
    });

    const expectedActions = [{
      type: ADD_CATEGORY,
      data: { name: 'science', description: 'Hello world' }
    }];

    const store = mockStore({});
    return store.dispatch(addCategoryAction({
      name: 'science',
      description: 'Hello world'
    }))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create GET_RENTED_BOOKS when trying to get rented books', () => {
    moxios.stubRequest('/api/v1/books/logs/1', {
      status: 200,
      response: mockData.returnedBook.rows
    });

    const expectedActions = [{
      type: ADD_CATEGORY,
      data: mockData.returnedBook.rows
    }];

    const store = mockStore({});
    return store.dispatch(getRentedBooksAction(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it('should create RETURN_RENTED_BOOK when returning a book', () => {
    moxios.stubRequest('/api/v1/users/1/books', {
      status: 201,
      response: mockData.returnedBook.rows
    });

    const expectedActions = [{
      type: RETURN_RENTED_BOOK,
      data: mockData.returnedBook.rows
    }];

    const store = mockStore({});
    return store.dispatch(returnBook(1, 3))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it(`should set response error 
  when user tries to rent books and API call fails`, () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 400,
        response: mockData.returnedBook
      });

      const expectedActions = [{
        type: RETURN_RENTED_BOOK,
        data: mockData.returnedBook
      }];

      const store = mockStore({});
      return store.dispatch(returnBook(1, 3))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });

  it('should create RENT_BOOK when returning a book', () => {
    moxios.stubRequest('/api/v1/users/1/books', {
      status: 201,
      response: mockData.returnedBook
    });

    const expectedActions = [{
      type: RENT_BOOK,
      data: mockData.returnedBook
    }];

    const store = mockStore({});
    return store.dispatch(rentBookAction(1, 3))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it(`should catch response error 
  when api response fail and user tries to rent Book`, () => {
      moxios.stubRequest('/api/v1/users/1/books', {
        status: 400,
        response: mockData.returnedBook
      });

      const expectedActions = [{
        type: RENT_BOOK,
        data: mockData.returnedBook
      }];

      const store = mockStore({});
      return store.dispatch(rentBookAction(1, 3))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });

  it('should create GET_CATEGORY when getting all category', () => {
    moxios.stubRequest('/api/v1/category', {
      status: 201,
      response: [{ name: 'science', description: 'Hello world' }]
    });

    const expectedActions = [{
      type: RETURN_RENTED_BOOK,
      data: [{ name: 'science', description: 'Hello world' }]
    }];

    const store = mockStore({});
    return store.dispatch(getCategoryAction())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });


  it(`should create GET_ALL_NOTIFICATION 
  when getAllNotification action is successful`, () => {
      const { notifications } = mockData;
      moxios.stubRequest('/api/v1/notification', {
        status: 200,
        response: notifications
      });

      const expectedActions = {
        type: GET_ALL_NOTIFICATIONS,
        user: notifications
      };

      const store = mockStore({});
      store.dispatch(getAllNotifications())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        })
        .catch(error => error);
    });


  it('should create SEARCH_BOOK when searching for books', () => {
    moxios.stubRequest('/api/v1/search', {
      status: 201,
      response: mockData.modifiedBook
    });

    const expectedActions = [{
      type: SEARCH_BOOK,
      data: mockData.modifiedBook
    }];

    const store = mockStore({});
    return store.dispatch(searchAction('test'))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      })
      .catch(error => error);
  });

  it(`should catch response error 
    when user tries to fetch books and API fails`, () => {
      moxios.stubRequest('/api/v1/search', {
        status: 400,
        response: mockData.modifiedBook
      });

      const expectedActions = [{
        type: SEARCH_BOOK,
        data: mockData.modifiedBook
      }];

      const store = mockStore({});
      return store.dispatch(searchAction('test'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
        .catch(error => error);
    });
});
