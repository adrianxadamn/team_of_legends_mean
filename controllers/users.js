// Require resource's model(s).
var request = require('request');
var User    = require("../models/user");
var util    = require("util");

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }

  var baseUriFindSummoner = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
  var searchIgn = req.body.ign;
  var apiKey = 'da00a520-06f1-4359-a686-4f48691f19a4';
  var buildUriFindSummoner = baseUriFindSummoner + searchIgn + '?api_key=' + apiKey;

  request.get(buildUriFindSummoner, function(err, data) {

    var jsonData = JSON.parse(data.body);
    var getSummonerId = jsonData[searchIgn].id;

    var buildUriFindSummonerStats = 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/'
                                  + getSummonerId + '/entry' + '?api_key=' + apiKey;

    request.get(buildUriFindSummonerStats, function(err, stats) {

      var jsonSummonerStats = JSON.parse(stats.body);
      // console.log("stats of summoner" + searchIgn + " :" + util.inspect(jsonSummonerStats, false, null));

      var tier = jsonSummonerStats[getSummonerId][0].tier;
      var division = jsonSummonerStats[getSummonerId][0].entries[0].division;
      var wins = jsonSummonerStats[getSummonerId][0].entries[0].wins;
      var losses = jsonSummonerStats[getSummonerId][0].entries[0].losses;

      User
        .create(req.body)
        .then(function(user) {
          //creates more of user's properties
          //ater being added to the database
          user.summonerId = getSummonerId;
          user.profile_defaultId = jsonData[searchIgn].profileIconId;
          user.tier = tier;
          user.division = division;
          user.wins = wins;
          user.losses = losses;
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
    })
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
