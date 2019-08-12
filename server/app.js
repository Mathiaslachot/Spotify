/** @format */

var createError = require('http-errors');
var express = require('express'),
  session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');

var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');
var artisteRouter = require('./routes/artiste');
var albumRouter = require('./routes/album');
var tokenRouter = require('./routes/token');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//auth

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/search', searchRouter);
app.use('/artiste', artisteRouter);
app.use('/album', albumRouter);
app.use('/token', tokenRouter);

app.use('/auth/spotify', authRoutes);

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
