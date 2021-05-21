require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const compression = require('compression');
const moment = require('moment');
const ErrorHandler = require('./utils/errorHandler.js');
const morganMiddleware = require('./utils/morganMiddleWare.js');
const Logger = require('./utils/logger.js');
const mysql = require('mysql');

// Setup DB
const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: ""
});


// Setup routers
const indexRouter = require('./routes/indexRouter');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(compression());
app.use(morganMiddleware);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '5gb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Setup flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.info_msg = req.flash('info_msg');
  res.locals.warning_msg = req.flash('warning_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Make our db accessible to our router
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Setup universal variables (url, user, notifications, moment, RolesAuthenticator)
app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  res.locals.moment = moment;
  next();
});


// Use the routes in the routers
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error.status = err.status;
  if (process.env.NODE_ENV === 'development') {
    res.locals.error = err;
  }
  else {
    res.locals.error = {};
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;