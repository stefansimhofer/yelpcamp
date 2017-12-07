const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/Campground');
const Comment = require('./models/Comment');
const User = require('./models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const moment = require('moment');
const flash = require('connect-flash');

const app = express();

const indexRoutes = require('./routes/index');
const campgroundRoutes = require('./routes/campgrounds');
const commentRoutes = require('./routes/comments');

<<<<<<< HEAD
mongoose.connect(process.env.DATABASE);
=======
mongoose.connect();
mongoose.Promise = global.Promise;
>>>>>>> bab82d9c794f3b657789ea2d1312e4a6f9ad7326

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(require('express-session')({
  secret: 'Yo',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments/', commentRoutes);

app.locals.moment = moment; 


app.listen(7777, () => {
  console.log("open browser");
});
