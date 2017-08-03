import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import winston from 'winston';
import validator from 'express-validator';
import UserRouter from './server/routes/users';
import BookRouter from './server/routes/books';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/users', UserRouter);
app.use('/api/books', BookRouter);
app.get('*', (req, res) => {
  res.send('<b>Hello World</b>');
});

const port = 8000;

app.listen(port, () => {
  winston.info(`Connected to port: ${port}`);
});

export default app;
