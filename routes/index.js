
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('register');
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', `Hello ${user.username}, Welcome to YelpCamp`);
        res.redirect('/campgrounds');
      });
    }
    
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function( req, res) {

  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged you out');
  res.redirect('/campgrounds');
});


module.exports = router;