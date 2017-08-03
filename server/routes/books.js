import express from 'express';

import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';

const app = express.Router();

app.route('/')
  .post(Validation.checkUserInput, BookController.create)
  .get(BookController.getBooks);
app.route('/:id')
  .put(BookController.modifyBook);
app.route('/books/:bookId')
  .post(BookController.rentBook);

export default app;
