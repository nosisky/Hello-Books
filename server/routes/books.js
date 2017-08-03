import express from 'express';
import Authorization from '../middleware/Authorization'
import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';

const app = express.Router();

app.route('/')
  .post(Validation.checkUserInput, BookController.create)
  .get(Authorization.isLoggedIn, BookController.getBooks);
app.route('/:id')
  .put(Authorization.isLoggedIn, BookController.modifyBook);
app.route('/books/:bookId')
  .post(Authorization.isLoggedIn, BookController.rentBook);

export default app;
