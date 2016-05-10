var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var postsController = require('../controllers/posts');
var token = require('./token_auth');
// root path:


// users resource paths:
router.post('/users',   usersController.create);
router.get('/users/me', token.authenticate, usersController.me);
router.get('/users/',   usersController.getUsers);

router.post('/token',    token.create);

// posts resource path:
router.get('/posts/', postsController.getPosts);
router.post('/posts/', token.authenticate, postsController.createPost);


module.exports = router;
