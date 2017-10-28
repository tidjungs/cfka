import express from 'express';
import mongoose from 'mongoose';
import moment from 'moment';
import cors from 'cors';
import Fetch from './model';
import bodyParser from 'body-parser';


mongoose.connect('mongodb://eveem:12345e@ds229415.mlab.com:29415/cfka');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/fetch/', (req, res) => {
  Fetch.find({}, (err, data) => {
    res.send(data);
  })
});

app.post('/fetch/', (req, res) => {
  const data = JSON.parse(Object.keys(req.body)[0]);
  console.log(data.firstName);
  Fetch.findOne({ 
    'firstName': data.firstName, 
    'lastName': data.lastName,
    'keyword': data.keyword,
    'group_id': data.group_id
  }, (err, response) => {
    if (!response) {
      Fetch.create({
        firstName: data.firstName,
        lastName: data.lastName,
        keyword: data.keyword,
        group_id: data.group_id,
        access_token: data.access_token,
        last_fetch: moment(),
      }, (err, fetch) => {
        res.send(fetch);
      });
    } else {
      Fetch.update({ 
        'firstName': data.firstName, 
        'lastName': data.lastName,
        'keyword': data.keyword,
        'group_id': data.group_id
       }, { $set: { keyword: data.keyword } }, (err, fetch) => {
        res.send(fetch);
      });
    }
  });
});

app.post('/update-user-id/', (req, res) => {
  Fetch.update({ 'firstName': req.body.firstName, 'lastName': req.body.lastName }, { $set: { user_id: req.body.user_id } }, (err, fetch) => {
    res.send(fetch);
  });
});

app.post('/fetch-delete/', (req, res) => {
  Fetch.remove({ 'user_id': req.body.user_id }, err => {
    if (!err)
      res.send('success');
    else
      res.send('error');
  });
});

app.listen(5000, function() {
  console.log('Express server listening on port ' + 5000);
});



