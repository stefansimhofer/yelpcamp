const mongoose = require('mongoose');
const Campground = require('./models/Campground');
const Comment = require('./models/Comment');

const data = [
  {
    name: 'Cloud\'s Rest',
    image: 'https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
  },
  {
    name: 'Mountain High',
    image: 'https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
  },
  {
    name: 'Daisy Creek',
    image: 'https://farm7.staticflickr.com/6162/6179142164_b75a97cbb2.jpg',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
  },
];

const seedDB = () => {
  Campground.remove((err) => {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campgrounds');
    data.forEach( seed => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Added a Campground');
          Comment.create(
            {
              text: 'This Place is great,but i wish there was internet',
              author: 'Homer'
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Added a Comment');
              }
              
            }
          );
        }
      });
    });
  });
}


module.exports = seedDB;