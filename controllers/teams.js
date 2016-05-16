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

function getSpecificTeam(req, res, next) {
  var team_abbr = req.params.team_abbr.toUpperCase();
  console.log("team_abbr:", team_abbr);

  Team.findOne({'team_abbr': team_abbr}).populate('owner').populate('members')
    .exec(function(err, team) {
      if (err) {
        res.send(err);
      }
      res.json(team);
    });
}

function addTeamMember(req, res, next) {
  var user = req.body[0];
  console.log("user:", user);
  var team_abbr = req.params.team_abbr.toUpperCase();
  console.log("team_abbr:", team_abbr);

  Team.findOne({'team_abbr': team_abbr}).populate('owner').populate('members')
    .exec(function(err, team) {
      if (err) {
        res.send(err);
      }

      if (user.team) {
        return res.status(422).send('User already in a team');
      } else {
        team.members.push(user);
        team.save();

        var team = team;

        console.log('updating and saving new team member:', team);

        User.findOne({"ign": user.ign}).populate('team')
          .exec(function(err, user) {
            user.team = team;
            user.save();
            res.json(user);
          });

      };


    });

}

module.exports = {
  get: get,
  create: create,
  getSpecificTeam: getSpecificTeam,
  addTeamMember: addTeamMember

};
