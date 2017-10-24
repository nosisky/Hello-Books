import { ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS,
  GET_CATEGORY,
  SEARCH_BOOK,
  DELETE_BOOK
} from '../actions/types';

const INITIAL_STATE = { userExist: '', error: '', message: '', user: '', content: '', authenticated: false, data: [] };

function BookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, message: 'Book added Successfully' };
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    case GET_RENTED_BOOKS:
      return { ...state, data: action.data };
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
    default:
      return state;
  }
}

export default BookReducer;

