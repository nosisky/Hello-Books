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

// Get all users
app.route('/all')
  .get(Authorization.isLoggedIn, Authorization.isAdmin, Authorization.getUsers);

// Rent a book
app.route('/:userId/books/:bookId')
  .post(Authorization.isLoggedIn,
    Authorization.validUser,
    Authorization.validBook,
    BookController.rentBook);

// Return rented book
app.route('/:userId/books/:bookId')
  .put(Authorization.isLoggedIn,
    Authorization.validUser,
    Authorization.validBook,
    BookController.returnBook);

// TOP SECRET: Create Admin route
app.route('/admin-x-x/signup')
  .post(Authorization.checkUserInput, UserController.create_admin);

// Get rented books
app.route('/:userId/books')
  .get(Authorization.isLoggedIn,
    Authorization.validUser,
    BookController.rentedBooks);
export default app;
