var mongoose = require('mongoose'); 

var FetchSchema = new mongoose.Schema({  
  keyword: String,
  group_id: String,
  group_name: String,
  user_id: String,
  last_fetch: Date
});

mongoose.model('Fetch', FetchSchema);
module.exports = mongoose.model('Fetch');