import express from 'express';

import UserController from '../controllers/User';
import Authorization from '../middleware/Authorization';

const app = express.Router();

app.route('/signup')
  .post(Authorization.checkUserInput, UserController.create);
app.route('/signin')
  .post(Authorization.validateLogin, UserController.login);

export default app;
