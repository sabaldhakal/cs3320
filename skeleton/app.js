var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var reqQuoteRouter = require('./routes/reqQuote');
//var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
var expressValidator = require('express-validator');
const flash = require('connect-flash');
var expressSession = require('express-session');
var session = require('express-session');
var passport = require('passport');
var config = require('./config/database');
var moment = require('moment');

var app = express();
app.set('trust proxy', 1) //trust first proxy


// database connection
var bodyParser = require('body-parser');
var mongoDB = 'mongodb://s_d264:Platinum2018@ds155903.mlab.com:55903/cs3320';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Check Connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressValidator());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//NOT RECOMMENDED FOR PRODOCTION! Not good for protection. Search for compatible session stores
//app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
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
