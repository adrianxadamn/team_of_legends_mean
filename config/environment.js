var _ = require('lodash');

var localEnvVars = {
  TITLE:      'team_of_legends_mean',
  SAFE_TITLE: 'team_of_legends_mean'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
