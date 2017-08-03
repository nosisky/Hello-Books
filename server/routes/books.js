import express from 'express';

import BookController from '../controllers/Book';
import Validation from '../middleware/Validation';

const app = express.Router();

app.route('/')
  .post(Validation.checkUserInput, BookController.create)
  .get(Validation.checkUserInput, BookController.create);
app.route('/:id')
  .put(Validation.validateLogin, BookController.login);

export default app;
