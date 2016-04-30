var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');

// Load local libraries.
var env      = require('./config/environment'),
    mongoose = require('./config/database'),
    routes   = require('./config/routes');

// Instantiate a server application.
var app = express();

// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);

// Create local variables for use thoughout the application.
app.locals.title = app.get('title');

/*
 * MIDDLEWARE STACK
 */

// CORS allows a separate client, like Postman, to send requests
// (in development only…)
if (app.get('env') === 'development') {
  app.use(allowCors); // See helper at bottom.
}

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Validate content-type.
app.use(validateContentType);

// Defines all of our "dynamic" routes.
app.use('/api', routes);

// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // res.redirect("/404.html");
  next(err)
});

// Error-handling layer.
app.use(addFailedAuthHeader);
app.use(function(err, req, res, next) {
  var message = err.message,
      status  = err.status || 500;

  res.status(status);

  if (app.get('env') === 'development' && status === 500) {
    res.json({
      message: message,
      error: err
    });
  } else {
    res.json(message);
  }
});


/*
 * HELPERS
 */

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST'];
  var type    = 'application/json';

  if (methods.indexOf(req.method) !== -1 && req.get('Content-Type') !== type) {
    res.status(400).send('Content-Type header must be application/json.');
  } else {
    next();
  }
}

function allowCors(req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Handle "preflight" requests.
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
}

// When there is a 401 Unauthorized, the repsonse shall include a header
// WWW-Authenticate that tells the client how they must authenticate
// their requests.
function addFailedAuthHeader(err, req, res, next) {
  var header = {'WWW-Authenticate': 'Bearer'};
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`;
    res.set(header);
  }
  next(err);
}

module.exports = app;
