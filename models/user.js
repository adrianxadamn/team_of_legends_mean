var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

championSchema = new mongoose.Schema({
  name:             { type: String },
  image:            { type: String }
});

var userSchema = new mongoose.Schema({
  email:              { type: String, required: true, unique: true},
  ign:                { type: String, required: true, unique: true},
  primary_role:       { type: String },
  transportation:     { type: Boolean },
  location:           { type: String },
  description:        { type: String },
  team:               {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                      },
  profile_defaultId:  { type: String },
  tier:               { type: String },
  division:           { type: String },
  champion_pool:      [championSchema],
  wins:               { type: Number },
  losses:             { type: Number },
  summonerId:         { type: String }
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
