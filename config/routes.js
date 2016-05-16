var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var postsController = require('../controllers/posts');
var teamsController = require('../controllers/teams');
var token = require('./token_auth');
// root path:


// users resource paths:
router.post('/users',   usersController.create);
router.get('/users/me', token.authenticate, usersController.me);
router.put('/users/me', token.authenticate, usersController.update);
router.get('/users/',   usersController.getUsers);
router.get('/users/:ign', usersController.getSpecificUser);

// token resource paths:
router.post('/token',    token.create);
router.post('/users/me/token', token.authenticate, token.refresh);

// posts resource path:
router.get('/posts/', postsController.getPosts);
router.post('/posts/', token.authenticate, postsController.createPost);

// teams resource path:
router.get('/teams/', teamsController.get);
router.post('/teams/', token.authenticate, teamsController.create);
router.get('/teams/:team_abbr', teamsController.getSpecificTeam);
router.put('/teams/:team_abbr', teamsController.addTeamMember);


module.exports = router;
