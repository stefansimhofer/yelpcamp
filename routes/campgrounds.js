const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/Campground');
const Comment = require('../models/Comment');
const middleware = require('../middleware');

router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {campgrounds: campgrounds})
    }
  })
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  const newCampground = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    date: Date.now(),
    author: {
      id: req.user._id,
      username: req.user.username
    }
  };

  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });

  
});

router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('new')
});

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { campground: foundCampground });
    }
  });
});

router.get('/:id/edit', middleware.checkChamgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('edit', {campground: foundCampground});
  });
});

router.put('/:id', middleware.checkChamgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

router.delete('/:id', middleware.checkChamgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      req.flash("success", "Campground deleted!");
      res.redirect('/campgrounds');
    }
  })
});





module.exports = router;