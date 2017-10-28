var mongoose = require('mongoose'); 

var ProfileSchema = new mongoose.Schema({
  messenger_id: String,
  info: {
    first_name: String,
    last_name: String,
  }
});

mongoose.model('Profile', ProfileSchema);
module.exports = mongoose.model('Profile');