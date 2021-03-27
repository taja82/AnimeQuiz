var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');
var logger = require('morgan');

var session = require("express-session");

var cors = require("cors");
const passport = require("passport");

const FacebookStrategy = require("passport-facebook").Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animeRouter = require('./routes/anime');
var countryRouter = require('./routes/country');

var app = express();

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB connected!!!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "cats",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/jp/dict', express.static(__dirname + '/node_modules/kuromoji/dict'));//kuroshiro
//app.use('/jp/dict', express.static(__dirname + '/node_modules'));//kuroshiro

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/anime', animeRouter);
app.use('/country', countryRouter);

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
