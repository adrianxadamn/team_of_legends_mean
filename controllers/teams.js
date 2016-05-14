// Require resource's model(s).
var User    = require('../models/user');
var Team    = require("../models/team");


function get(req, res, next) {
  Team.find({}).populate("members").populate("owner").exec()
    .then(function(teams) {
      res.json(teams);
    });
}


function create(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      var user = user;
      console.log("user:", user);

      Team
        .create(req.body)
        .then(function(team) {

          team.owner = user;
          team.save();
          console.log('team saved:', team);
          res.json(team);

        });
    });
}


module.exports = {
  get: get,
  create: create

};
