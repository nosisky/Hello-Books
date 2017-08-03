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
  .get(Authorization.getUsers);
app.route('/:userId/books/:bookId')
  .post(BookController.rentBook);
export default app;
