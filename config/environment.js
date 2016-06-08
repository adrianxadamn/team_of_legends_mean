var _ = require('lodash');

require("dotenv").load();

var localEnvVars = {
  TITLE:      'team_of_legends_mean',
  SAFE_TITLE: 'team_of_legends_mean',
  COOKIE_SECRET:  'notsosecretnowareyou',
  SESSION_SECRET: 'anotherfoolishsecret',
  TOKEN_SECRET:   'andafinalsecretsadasitis'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
