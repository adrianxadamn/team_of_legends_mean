var mongoose = require('./database');

var User = require('../models/user');
var Post = require('../models/post');
var Team = require('../models/team');


// Team
//   .remove({})
//   .then(function() {
//     console.log('All teams removed…');

//     return mongoose.connection.close();
//   })
//   .then(function() {
//     process.exit(0);
//   });

User
  .remove({})
  .then(function() {
    console.log('All users removed…');

    return mongoose.connection.close();
  })
  .then(function() {
    process.exit(0);
  });

// Post
//   .remove({})
//   .then(function() {
//     console.log('All Posts removed...');

//     return mongoose.connection.close();
//   })
//   .then(function() {
//     process.exit(0);
//   });
