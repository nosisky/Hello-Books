import { ADD_BOOK,
  GET_ALL_BOOKS
} from '../actions/types';

const INITIAL_STATE = { userExist: '', error: '', message: '', user: '', content: '', authenticated: false, data: '' };

function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, message: 'Book added Successfully' };
    case GET_ALL_BOOKS:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default bookReducer;

