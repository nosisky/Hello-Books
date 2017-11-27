import express from 'express';
import Authorization from '../middleware/Authorization';
import BookController from '../controllers/Book';

const app = express.Router();

app.route('/')
  .get(Authorization.isLoggedIn,
    Authorization.isAdmin,
    BookController.getNotification);


export default app;
