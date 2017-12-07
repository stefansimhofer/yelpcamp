
const Campground = require('../models/Campground');
const Comment = require('../models/Comment');
const middlewareObj = {};


middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash("error", "Not found!");
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You have no Permission for this Action");
          res.redirect('back');
        }        
      }
    });
    console.log('Yo');
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect('back');
  }
};

middlewareObj.checkChamgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        req.flash("error", "Not found!");
        res.redirect('back');
      } else {
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You have no Permission for this Action");
          res.redirect('back');
        }
        
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect('/login');
};

module.exports = middlewareObj;