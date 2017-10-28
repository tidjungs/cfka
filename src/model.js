var mongoose = require('mongoose'); 

var FetchSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  keyword: String,
  group_id: String,
  user_id: String,
  last_fetch: Date,
  access_token: String
});

mongoose.model('Fetch', FetchSchema);
module.exports = mongoose.model('Fetch');