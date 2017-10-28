import express from 'express';
import mongoose from 'mongoose';
import moment from 'moment';
import cors from 'cors';
import Fetch from './model';
const bodyParser = require('body-parser');


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
  Fetch.findOne({ 'user_id': req.body.user_id }, (err, data) => {
    if (!data) {
      Fetch.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        keyword: req.body.keyword,
        group_id: req.body.group_id,
        user_id: req.body.user_id,
        access_token: req.body.access_token,
        last_fetch: moment(),
      }, (err, fetch) => {
        res.send(fetch);
      });
    } else {
      Fetch.update({ 'user_id': req.body.user_id }, { $set: { keyword: req.body.keyword } }, (err, fetch) => {
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



