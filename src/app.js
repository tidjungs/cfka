const mongoose = require('mongoose');
const Fetch = require('./model');

mongoose.connect('mongodb://eveem:12345e@ds229415.mlab.com:29415/cfka');

Fetch.create({
	keyword: ,
	group_id: ,
	group_name: ,
	user_id: ,
	last_fetch: 
});