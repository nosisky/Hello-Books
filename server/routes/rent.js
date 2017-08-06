import express from 'express';
import BookController from '../controllers/Book';
import Authorization from '../middleware/Authorization';

const app = express.Router();
app.route('/books/:bookId')
  .post(Authorization.isLoggedIn, BookController.rentBook);

export default app;
