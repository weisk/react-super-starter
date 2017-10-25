require('ignore-styles');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const babelRc = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.babelrc'), 'utf-8'));
require('babel-register')(Object.assign({}, babelRc, {
  ignore: /\/(build|node_modules)\//
}));

const api = require('./api');
const universal = require('./universal');

const PORT = process.env.PORT || 3001;
const app = express();

// Support Gzip
app.use(compression());

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup logger
app.use(morgan('combined'));

// Cookies
app.use(cookieParser());

// the first GET request should always go to SSR index
app.get('/', universal);

// static files
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// render all routes
app.use('/', universal);

// api
app.use('/api', api);

module.exports = app;
