var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var commentSchema = new mongoose.Schema({
  author:      {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "User"
               },
  body:        { type: String, required: true},
  upvotes:     { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now }

});

var postSchema = new mongoose.Schema({
  author:      {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "User"
               },
  title:       { type: String, required: true},
  body:        { type: String, required: true},
  comments:    [commentSchema],
  upvotes:     { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now }


});


var Post = mongoose.model('Post', postSchema);

module.exports = Post;
