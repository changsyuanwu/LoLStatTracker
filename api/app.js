require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');

// Setup DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(function (err) {
  if (err) {
    console.error('error connecting to mysql database: ' + err.stack);
    return;
  }

  console.log('connected to MySQL database');
});

// Router setup
const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');

// App setup
const app = express();

// Make our db accessible to our router
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Use the router
app.use('/', indexRouter);
app.use('/users', usersRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
