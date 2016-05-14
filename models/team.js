var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var teamSchema = new mongoose.Schema({
  name:              { type: String, required: true, unique: true},
  team_abbr:         { type: String, required: true, unique: true, minlength: 2, maxlength: 3},
  team_image:        { type: String, required: true },
  location:          { type: String, required: true },
  description:       { type: String },
  owner:             {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                     },
  members:           [{
                       type: mongoose.Schema.Types.ObjectId,
                       ref: "User"
                     }],
  createdAt:         { type: Date, default: Date.now }

});

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;
