// Require resource's model(s).
var request = require('request');
var User    = require('../models/user');
var Post    = require("../models/post");


function getPosts(req, res, next) {
  Post.find({}, function(err, users) {
    if(err) {
      res.send(err);
    }
    res.json(users);
  });
}

function createPost(req, res, next){
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      console.log("user:", user);

      Post
        .create({
          title: req.body.title,
          body: req.body.body
        });


    });
}

module.exports = {
  getPosts: getPosts,
  createPost: createPost
};
