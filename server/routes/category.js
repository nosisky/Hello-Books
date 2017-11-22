import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

app.route('/')
  .get(Authorization.isLoggedIn,
    BookController.getCategory);

export default app;
