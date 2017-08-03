import express from 'express';

import UserController from '../controllers/User';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

app.route('/signup')
  .post(Authorization.checkUserInput, UserController.create);

app.route('/signin')
  .post(Authorization.validateLogin, UserController.login);

app.route('/all')
  .get(Authorization.isLoggedIn, Authorization.getUsers);

app.route('/:userId/books/:bookId')
  .post(Authorization.isLoggedIn, BookController.rentBook);

app.route('/:userId/books/:bookId')
  .put(Authorization.isLoggedIn, BookController.returnBook);

app.route('/:bookId/books')
  .get(Authorization.isLoggedIn, BookController.rentedBooks);
export default app;
