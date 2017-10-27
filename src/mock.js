const mongoose = require('mongoose');
const Fetch = require('./model');

mongoose.connect('mongodb://eveem:12345e@ds229415.mlab.com:29415/cfka');

Fetch.create({
	keyword: 'อาบน้ำ',
	group_id: '1924443867832338',
	group_name: 'Facebook Developer Circle: Bangkok',
	user_id: '1688711797867394',
	last_fetch: 0
});