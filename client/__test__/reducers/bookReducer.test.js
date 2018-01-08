import expect from 'expect';
import bookReducer from '../../reducers/bookReducer';
import { GET_ALL_BOOKS,
  DELETE_BOOK,
  SEARCH_BOOK,
  ADD_BOOK,
  GET_RENTED_BOOKS,
  EDIT_BOOK,
  RETURN_RENTED_BOOK
} from '../../actions/ActionTypes';

describe('Book Reducer:', () => {
  it('should return list of books for GET_ALL_BOOK', () => {
    const initialState = {
      data: []
    };
    const books = { count: 4, rows: [{ title: 'test' }, { title: 'game' }] };
    const action = {
      type: GET_ALL_BOOKS,
      books,
    };
    const newState = bookReducer(initialState, action);
    expect(action.books.rows[0].title).toEqual('test');
    expect(newState.data.length).toEqual(2);
  });

  it('should completely delete a book', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };

    const action = {
      type: DELETE_BOOK,
      data: book[0].id,
    };
    const deleteState = bookReducer(initialState, action);
    expect(deleteState.data.length).toEqual(1);
  });

  it('should return success message for ADD_BOOK', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: book };

    const action = {
      type: ADD_BOOK,
      message: 'Book added successfully',
    };
    const state = bookReducer(initialState, action);
    expect(state.message).toEqual('Book added Successfully');
  });

  it('should return list of books for SEARCH_BOOK', () => {
    const book = { count: 2, rows: [{ id: 1, title: 'test' }, { id: 2, title: 'game' }] };
    const initialState = { data: { rows: [] } };

    const action = {
      type: SEARCH_BOOK,
      data: book,
    };
    const state = bookReducer(initialState, action);

    expect(state.data).toEqual(book.rows);
  });

  it('should return list of books for GET_RENTED_BOOKS', () => {
    const book = [{ id: 1, title: 'test' }, { id: 2, title: 'game' }];
    const initialState = { data: [] };

    const action = {
      type: GET_RENTED_BOOKS,
      data: book,
    };
    const state = bookReducer(initialState, action);
    expect(state.allRentedBooks).toEqual(book);
    expect(state.allRentedBooks[0].title).toEqual('test');
  });

  it('should return a rented book with RETURN_RENTED_BOOKS', () => {
    const book = [{ bookId: 1, title: 'test', returned: false },
      { bookId: 2, title: 'game', returned: false }];
    const initialState = { allRentedBooks: book };
    const returnedBook = { id: 1, title: 'test', returned: true };

    const action = {
      type: RETURN_RENTED_BOOK,
      data: returnedBook,
    };
    const state = bookReducer(initialState, action);
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
      type: EDIT_BOOK,
      data: editedBook,
    };
    const state = bookReducer(initialState, action);
    expect(state.data[0].title).toEqual('test me');
  });
});
