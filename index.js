import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { verifyWebhook } from './routes/webhook_verify.js';
/*
const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
*/
const app = express();

// app configuration
app.set('port', (process.env.PORT || 5000));

// setup our express application
app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json()); 

// app routes
verifyWebhook(app);

// warming up the engines !! setta !! go !!!.
app.listen(app.get('port'), function() {
  const url = 'http://localhost:' + app.set('port');
  console.log('Application running on port: ', app.get('port'));
});