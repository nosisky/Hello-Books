import express from 'express';

import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';
//import Authorization from '../middleware/Authorization';

const app = express.Router();

app.route('/')
  .post(Validation.checkUserInput, BookController.create)
  .get(BookController.getBooks);
app.route('/:id')
  .put(BookController.modify);

export default app;
