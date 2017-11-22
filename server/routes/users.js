import express from 'express';

import Validation from '../middleware/Validation';
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

// User Exist
app.route('/get')
  .post(Authorization.UserExist);

// Email Exist
app.route('/getemail')
  .post(Authorization.emailExist);


// Rent a book
app.route('/:userId/books')
  .post(Authorization.isLoggedIn,
    Authorization.validUser,
    Authorization.validBook,
    Validation.checkTotalBook,
    Authorization.hasRentedBefore,
    BookController.rentBook);

// Return rented bookS
app.route('/:userId/books')
  .put(Authorization.isLoggedIn,
    Authorization.validUser,
    Authorization.validBook,
    BookController.returnBook);

// Get rented books
app.route('/:userId/books')
  .get(Authorization.isLoggedIn,
    Authorization.validUser,
    BookController.rentedBooks);

// Edit user profile
app.route('/edit/:userId')
  .put(Authorization.isLoggedIn,
    Authorization.validUser,
    UserController.editProfile);

// Get a specific user
app.route('/:userId')
  .get(Authorization.isLoggedIn,
    Authorization.validBook,
    Authorization.getOneUser);

export default app;
