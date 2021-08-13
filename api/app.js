require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Setup DB
let db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  stringifyObjects: true
}).promise();

// Router setup
const indexRouter = require('./routes/indexRouter');
const championsRouter = require('./routes/championsRouter');
const matchesRouter = require('./routes/matchesRouter');
const usersRouter = require('./routes/usersRouter');

// App setup
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Add cors
const corsOptions = {
  credentials: true,
  origin: [ 
    'http://localhost:9000',
    'http://localhost:3000'
  ]
}
app.use(cors(corsOptions));
app.options('*', cors());  // enable pre-flight

// Make our db accessible to our router
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Passport configuration
passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      const db = req.db;

      try {
        // try to find the user
        const [ rows ] = await db.query("SELECT * FROM users WHERE username = ?", [ username ]);
        
        if (!rows.length) {
          return done(null, false, { message: "no user found" });
        }
        
        let user = rows[0];

        bcrypt.compare(password, user.pass, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          }
          else {
            return done(null, false, { message: "incorrect password" });
          }
        });
      }
      catch (err) {
        throw err;
      }
    })      
);
passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(function (username, done) {
  // find user
  db.query("SELECT * FROM users WHERE username = ?", [ username ], function (err, rows) {	
    done(err, rows[0]);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Module setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// Setup session (expires in 15 minutes)
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_COOKIE_NAME,
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    sameSite: "none",
    httpOnly: true,
    maxAge: 900000
  }
}));

// Add the routers to the app
app.use('/', indexRouter);
app.use('/champions', championsRouter);
app.use('/matches', matchesRouter);
app.use('/users', usersRouter);

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
