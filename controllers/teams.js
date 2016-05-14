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

          var team = team;

          team.owner = user;
          team.members.push(user);
          team.save();
          console.log('team saved:', team);

          User.findById(req.decoded._id).exec()
            .then(function(user) {
              user.team = team;
              user.save();

              console.log('user saved:', user);
              res.json(user);
            })
        });
    });
}


module.exports = {
  get: get,
  create: create

};
