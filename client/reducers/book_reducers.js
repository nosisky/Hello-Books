import { ADD_BOOK,
  GET_ALL_BOOKS,
  GET_RENTED_BOOKS
} from '../actions/types';

const INITIAL_STATE = {};

function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, message: 'Book added Successfully' };
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    case GET_RENTED_BOOKS:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default bookReducer;

