import { ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS,
  GET_CATEGORY,
  SEARCH_BOOK,
  DELETE_BOOK,
  RETURN_RENTED_BOOK
} from '../actions/types';

const INITIAL_STATE = { userExist: '', error: '', message: '', user: '', allRentedBooks: [], content: '', authenticated: false, data: [] };

function BookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, message: 'Book added Successfully' };
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    case GET_RENTED_BOOKS:
      return { ...state, allRentedBooks: action.data };
    case GET_CATEGORY:
      return { ...state, data: action.data };
    case SEARCH_BOOK:
      return { ...state, data: action.data };
    case DELETE_BOOK: {
      const newState = state.data.filter(book =>
        (book.id !== action.data)
      );
      return { ...state, data: newState };
    }
    case RETURN_RENTED_BOOK: {
      const newData = [];
      state.allRentedBooks.map((book) => {
        if (book.id === action.data.id) {
          newData.push(action.data);
        }
        newData.push(action.data);
      }

      );
      return { ...state, allRentedBooks: newData };
    }
    default:
      return state;
  }
}

export default BookReducer;

