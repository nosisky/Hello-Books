import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import swagger from 'swagger-jsdoc';
import webpack from 'webpack';
import winston from 'winston';
import webpackMiddleware from 'webpack-dev-middleware';
import validator from 'express-validator';
import webpackConfigDev from './webpack.config.dev';
import userRouter from './server/routes/userRouter';
import bookRouter from './server/routes/bookRouter';
import categoryRouter from './server/routes/categoryRouter';
import searchRouter from './server/routes/searchRouter';
import notificationRouter from './server/routes/notificationRouter';

const app = express();

dotenv.load();

const swaggerJSDoc = swagger;
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'HelloBooks API',
    version: '1.0.0',
    description:
   'An application that helps manage a library and its processes '
   + 'like stocking, tracking and renting of books.'
  },
  host: 'andela-hellobooks.herokuapp.com',

  basePath: '/api/v1'
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use(logger('dev'));
app.use(express.static('./client/')); // configure static files folder
app.use(express.static('./client/public/')); // configure static files folder
app.use('/api/docs/', express.static(path.join(__dirname, 'server/api-docs/')));

if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfigDev)));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1', bookRouter);

app.use('/api/v1/category', categoryRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/search', searchRouter);

app.use('/api/v1/notification', notificationRouter);

// serve swagger
app.get('/api/docs/hellobooks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  winston.info(`Connected on port: ${port}`);
});

export default app;
