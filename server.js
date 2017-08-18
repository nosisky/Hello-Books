import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';
import validator from 'express-validator';
import UserRouter from './server/routes/users';
import BookRouter from './server/routes/books';

const app = express();

dotenv.load();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(express.static('public')); // configure static files folder

app.get('/', (req, res) => {
  res.send('<h1 style="color: blue; font-family: cursive; text-align: center;">Welcome to Hello Books Project By: Abdulrasaq Nasirudeen</h1>');
});

app.use('/api/v1/users', UserRouter);

app.use('/api/v1/books', BookRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  winston.info(`Connected on port: ${port}`);
});

export default app;
