/* eslint-disable no-console */
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');

const abtnode = require('../routes/abtnode');
const session = require('../routes/session');

const isProduction = process.env.NODE_ENV === 'production';

// Create and config express application
const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');

    if (isProduction) {
      // Log only in AWS context to get back function logs
      console.log(log);
    }

    return log;
  })
);

const router = express.Router();

abtnode.init(app);
session.init(router);

if (isProduction) {
  const staticDir = process.env.BLOCKLET_APP_ID ? './' : '../../';

  app.use(compression());
  app.use(router);
  if (process.env.BLOCKLET_DID) {
    app.use(`/${process.env.BLOCKLET_DID}`, router);
  }

  const staticDirNew = path.resolve(__dirname, staticDir, 'build');
  app.use(express.static(staticDirNew, { maxAge: '365d', index: false }));
  if (process.env.BLOCKLET_DID) {
    app.use(`/${process.env.BLOCKLET_DID}`, express.static(staticDirNew, { maxAge: '365d', index: false }));
  }

  app.use(fallback('index.html', { root: staticDirNew }));

  app.use((req, res) => {
    res.status(404).send('404 NOT FOUND');
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
} else {
  app.use(router);
}

// Make it serverless
exports.handler = serverless(app);
exports.server = app;
