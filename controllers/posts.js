// Require resource's model(s).
var request = require('request');
var User    = require('../models/user');
var Post    = require("../models/post");


function getPosts(req, res, next) {
  Post.find({}).populate("author").exec()
    .then(function(posts) {
      res.json(posts);
    });

}

function createPost(req, res, next){
  User.findById(req.decoded._id).exec()
    .then(function(user) {

      var user = user;

      Post
        .create(req.body)
        .then(function(post) {
          post.author = user;
          post.save();
        })

    });
}

module.exports = {
  getPosts: getPosts,
  createPost: createPost
};
