import {
  ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS,
  GET_CATEGORY,
  SEARCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  GET_ONE_BOOK,
  SET_OFFSET,
  RETURN_RENTED_BOOK,
  ADD_CATEGORY,
  GET_ALL_NOTIFICATIONS,
  RENT_BOOK
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  userExist: '',
  count: 0,
  category: [],
  notifications: [],
  error: '',
  search: false,
  message: '',
  user: '',
  allRentedBooks: [],
  content: '',
  authenticated: false,
  data: []
};

/**
 * @description - Book reducer
 *
 * @param {Object} state - Object containing the defaul state
 *
 * @param {Object} action - Object containing displatched data
 *
 * @returns {Object} - Object containing the store data
 */
function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        message: 'Book added Successfully',
        data: state.data.concat([action.book])
      };
    case GET_ALL_BOOKS:
      return { ...state, count: action.books.count, data: action.books.rows };
    case GET_ONE_BOOK:
      return { ...state, OneBook: action.data[0] };
    case GET_RENTED_BOOKS:
      return {
        ...state,
        count: action.data.count,
        allRentedBooks: action.data
      };
    case GET_CATEGORY:
      return { ...state, category: action.data };
    case GET_ALL_NOTIFICATIONS:
      return { ...state, notifications: action.notifications };
    case ADD_CATEGORY: {
      const newCategory = [action.data].concat(state.category);
      return { ...state, category: newCategory };
    }
    case SEARCH_BOOK:
      return {
        ...state,
        search: true,
        count: action.data.count,
        data: action.data.rows
      };
    case SET_OFFSET:
      return { offset: state.offset + action.data };
    case DELETE_BOOK: {
      const newState = state.data.filter(book => book.id !== action.data);
      return { ...state, count: state.count - 1, data: newState };
    }
    case RETURN_RENTED_BOOK: {
      const returnedBooks = [];
      state.allRentedBooks.map((book) => {
        if (book.bookId === action.data.id) {
          book.returned = true;
        }
        returnedBooks.push(book);
      });
      return { ...state, allRentedBooks: returnedBooks };
    }
    case RENT_BOOK: {
      const newRentedBook = [action.rentedBook].concat(state.allRentedBooks);
      return { ...state, allRentedBooks: newRentedBook };
    }
    case EDIT_BOOK: {
      const editedBooks = [];
      state.data.map((book) => {
        if (book.id === action.data.id) {
          editedBooks.push(action.data);
        } else {
          editedBooks.push(book);
        }
      });
      return { ...state, data: editedBooks };
    }
    default:
      return state;
  }
}

export default bookReducer;
