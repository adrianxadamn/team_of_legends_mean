var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var token = require('./token_auth');
// root path:


// users resource paths:
router.post('/users',   usersController.create);
router.get('/users/me', token.authenticate, usersController.me);

module.exports = router;
