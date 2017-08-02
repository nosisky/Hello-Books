import express from 'express';

import logger from 'morgan';

import bodyParser from 'body-parser';

import winston from 'winston';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('<b>Hello World</b>');
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
const port = 8000;

app.listen(port, () => {
  winston.info(`Connected to port: ${port}`);
});

module.exports = app;