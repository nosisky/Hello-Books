import express from 'express';
import BookController from '../controllers/Book';

const app = express.Router();
app.route('/books/:bookId')
  .post(BookController.rentBook);

export default app;
