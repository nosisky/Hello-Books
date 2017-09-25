import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

// Search for books
app.route('/')
  .post(Authorization.isLoggedIn,
    BookController.search);

export default app;
