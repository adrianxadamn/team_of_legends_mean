// Require resource's model(s).
var request = require('request');
var User = require("../models/user");

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }

  console.log("req.body:", req.body);

  var baseUri = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
  var searchIgn = req.body.ign;
  var apiKey = 'da00a520-06f1-4359-a686-4f48691f19a4';
  var buildUri = baseUri + searchIgn + '?api_key=' + apiKey;
  request.get(buildUri, function(err, data) {
    var jsonData = JSON.parse(data.body);
    console.log("jsonData:", jsonData);
    console.log("summonerId:", jsonData[searchIgn].id);

    User
      .create(req.body)
      .then(function(user) {
        console.log("check this user:", user);
        user.summonerId = jsonData[searchIgn].id;
        user.profile_defaultId = jsonData[searchIgn].profileIconId;
        user.save();
        res.json({
          success: true,
          message: 'Successfully created user.'
        });
      }).catch(function(err) {
        if (err.message.match(/E11000/)) {
          err.status = 409;
        } else {
          err.status = 422;
        }
        next(err);
      });
  });
};


function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      });
    })
    .catch(function(err) {
      next(err);
    });
};


module.exports = {
  create: create,
  me:  me
};
