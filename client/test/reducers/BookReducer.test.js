import expect from 'expect';
import BookReducer from '../../reducers/BookReducer';
import * as ActionTypes from '../../actions/types';

describe('Book Reducer', () => {
  it('should return list of books for GET_ALL_BOOK', () => {
    const initialState = {
      data: []
    };
    const book = [{ title: 'test' }, { title: 'game' }];
    const action = {
      type: ActionTypes.GET_ALL_BOOKS,
      data: book,
    };
    const newState = BookReducer(initialState, action);
    expect(newState.data[0].title).toEqual('test');
    expect(newState.data.length).toEqual(2);
  });
  it('should completely delete a book', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };
    
    const action = {
      type: ActionTypes.DELETE_BOOK,
      data: book[0].id,
    };
    const deleteState = BookReducer(initialState, action);
    expect(deleteState.data.length).toEqual(1);
  });

  it('should return success message for ADD_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };
    
    const action = {
      type: ActionTypes.ADD_BOOK,
      message: 'Book added successfully',
    };
    const state = BookReducer(initialState, action);
    expect(state.message).toEqual('Book added Successfully');
  });

  it('should return list of books for SEARCH_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: [] };
    
    const action = {
      type: ActionTypes.SEARCH_BOOK,
      data: book,
    };
    const state = BookReducer(initialState, action);
    expect(state.data).toEqual(book);
  });

  it('should return list of books for GET_RENTED_BOOKS', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: [] };
    
    const action = {
      type: ActionTypes.GET_RENTED_BOOKS,
      data: book,
    };
    const state = BookReducer(initialState, action);
    expect(state.allRentedBooks).toEqual(book);
    expect(state.allRentedBooks[0].title).toEqual('test');
  });

  it('should return a rented book with RETURN_RENTED_BOOKS', () => {
    const book = [{ bookId: 1, title: 'test', returned: false }, { bookId: 2, title: 'game', returned: false }];
    const initialState = { allRentedBooks: book };
    const returnedBook = { id: 1, title: 'test', returned: true };

    const action = {
      type: ActionTypes.RETURN_RENTED_BOOK,
      data: returnedBook,
    };
    const state = BookReducer(initialState, action);
    expect(state.allRentedBooks).toEqual(book);
    expect(state.allRentedBooks[0].title).toEqual('test');
    expect(state.allRentedBooks[0].returned).toEqual(true);
    expect(state.allRentedBooks.length).toEqual(2);
  });

  it('should return edited book details with EDIT_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };
    const editedBook = { id: 1, title: 'test me' };
    
    const action = {
      type: ActionTypes.EDIT_BOOK,
      data: editedBook,
    };
    const state = BookReducer(initialState, action);
    expect(state.data[0].title).toEqual('test me');
  });
});
