// Require resource's model(s).
var request = require('request');
var User    = require("../models/user");
var util    = require("util");
var env     = require("../config/environment");

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields');
  }

  var baseUriFindSummoner = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
  var searchIgn = req.body.ign.replace(" ", "");
  var apiKey = process.env.apiKey;
  var buildUriFindSummoner = baseUriFindSummoner + searchIgn + '?api_key=' + apiKey;

  request.get(buildUriFindSummoner, function(err, data) {
    var jsonData = JSON.parse(data.body);

    //prevents creating user if IGN
    //doesn't exist on RIOT Database
    if (jsonData[searchIgn] === undefined) {
      return res.status(404).send("Account does not exist");
    } else {
      var getSummonerId = jsonData[searchIgn].id;
    }

    //prevents creating user if IGN
    //doesn't exist on RIOT Database
    if (getSummonerId === undefined) {
      return res.status(422).send("Account does not exist");
    }

    var buildUriFindSummonerStats = 'https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/'
                                  + getSummonerId + '/entry' + '?api_key=' + apiKey;

    request.get(buildUriFindSummonerStats, function(err, stats) {
      var jsonSummonerStats = JSON.parse(stats.body);
      console.log("jsonSummonerStats:", jsonSummonerStats);
      // console.log("stats of summoner" + searchIgn + " :" + util.inspect(jsonSummonerStats, false, null));

      if (jsonSummonerStats[getSummonerId] === undefined) {
        console.log(err);
      } else {
        var tier = jsonSummonerStats[getSummonerId][0].tier;
        var division = jsonSummonerStats[getSummonerId][0].entries[0].division;
        var wins = jsonSummonerStats[getSummonerId][0].entries[0].wins;
        var losses = jsonSummonerStats[getSummonerId][0].entries[0].losses;


        var buildUriFindTopChampsPlayed = 'https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/'
                                        + getSummonerId + '/ranked' + '?api_key=' + apiKey;

        request.get(buildUriFindTopChampsPlayed, function(err, champs) {

          var jsonTopChampsPlayed = JSON.parse(champs.body);

          // console.log('jsonTopChampsPlayed:', util.inspect(jsonTopChampsPlayed.champions, false, null));

          var allChamps = jsonTopChampsPlayed.champions;
          var allChampsWithNumOfPlays = [];

          for (var i = 0; i < allChamps.length; i++) {
            allChampsWithNumOfPlays.push({"champId": allChamps[i].id, "champStats": allChamps[i].stats.totalSessionsPlayed });
          }

          console.log("allChampsWithNumOfPlays:", allChampsWithNumOfPlays);

          //to sort champions played from most played to least
          allChampsWithNumOfPlays.sort(function(a, b) {
            if (a.champStats > b.champStats) {
              return -1;
            } else if (a.champStats < b.champStats) {
              return 1;
            } else {
              return 0;
            }

          });

          console.log("sorted:", allChampsWithNumOfPlays);

          //the final product of selecting top 9 champions for champion pool
          var top9Champs = [];

          for (var k = 1; k < 10; k++) {
            top9Champs.push(allChampsWithNumOfPlays[k]);
          }

          console.log("top9Champs:", top9Champs);

          var top9ChampionNames = [];

          getChampionName(0);

          function getChampionName(num) {
            var buildUriFindTopChampsName = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'
                                          + top9Champs[num].champId +'?champData=stats' + '&api_key=' + apiKey;

            request.get(buildUriFindTopChampsName, function(err, championName) {
              var jsonChampionName = JSON.parse(championName.body);
              var championName = jsonChampionName.name.replace(" ", "");
              top9ChampionNames.push({"champName": championName, "champStats": top9Champs[num].champStats});

              num++;

              if (num !== 9) {
                getChampionName(num);
              } else {
                console.log("top9ChampionNames:", top9ChampionNames);
                console.log("FUCK");
                User
                  .create(req.body)
                  .then(function(user) {
                    //creates more of user's properties
                    //ater being added to the database
                    user.summonerId = getSummonerId;
                    user.profile_defaultId = jsonData[searchIgn].profileIconId;

                    if (jsonSummonerStats[getSummonerId] === undefined) {
                      console.log("no ranked stats");
                    } else {
                      user.tier = tier;
                      user.division = division;
                      user.wins = wins;
                      user.losses = losses;
                      user.champion_pool = top9ChampionNames;
                    }

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
              }

            });

          }
        });
      }
    });
  });
}


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

function update(req, res, next) {
  console.log("req.body:", req.body);
  User
    .findById(req.decoded._id).exec()
    .then(function(user) {

      console.log("user:", user);

      if (req.body.email)            user.email           = req.body.email;
      if (req.body.transportation)   user.transportation  = req.body.transportation;
      if (req.body.location)         user.location        = req.body.location;
      if (req.body.description)      user.description     = req.body.description;
      if (req.body.primary_role)     user.primary_role    = req.body.primary_role;

      return user.save();

    })
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully updated user data.'
      });
    })
    .catch(function(err) {
      next(err);
    })
};

function getUsers(req, res, next) {
  User.find({}).populate('team').exec()
    .then(function(users) {
      res.json(users);
    })
};

function getSpecificUser(req, res, next) {
  var ign = req.params.ign;

  User.findOne({'ign': ign}).populate('team')
    .exec(function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });

};



module.exports = {
  create: create,
  me:  me,
  update: update,
  getUsers: getUsers,
  getSpecificUser: getSpecificUser
};
