import express from 'express';

import UserController from '../controllers/User';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

// Sign up route
app.route('/signup')
  .post(Authorization.checkUserInput, UserController.create);

// Sign in route
app.route('/signin')
  .post(Authorization.validateLogin, UserController.login);

// Get all users route
app.route('/all')
  .get(Authorization.isLoggedIn, Authorization.getUsers);

// Rent a book
app.route('/:userId/books/:bookId')
  .post(Authorization.isLoggedIn, BookController.rentBook);

// Return rented book
app.route('/:userId/books/:bookId')
  .put(Authorization.isLoggedIn, BookController.returnBook);

app.route('/:bookId/books')
  .get(Authorization.isLoggedIn, BookController.rentedBooks);
export default app;
