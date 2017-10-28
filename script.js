import request from 'request';
import mongoose from 'mongoose';
import moment from 'moment';
import noti from './src/noti';
import Fetch from './src/model';
import Profile from './src/profile';

mongoose.Promise = Promise;
// const keyword = 'อาบน้ำ';
// const access_token = 'EAAB5ij8RTdUBAB8tda1qi6OPbJOEdyhOAVzcJqsSYNPhEm1HQpPoN1WEHKRChC9S005ZClUDF5c6Ylx7SYw8uPOZBeukm466P2EjQzGoNWqZAmHy7x3e1T5KrIvleqYHqAvdHXGoFnSm6et5Jx9xJAhv6M3hzMZD';

mongoose.connect('mongodb://eveem:12345e@ds229415.mlab.com:29415/cfka');


const doRequest = url => new Promise((resolve, reject) => {
  request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      resolve(body);
    } else {
      reject(err);
    }
  });
});

const doQuery = () => new Promise((resolve, reject) => {
  Fetch.find({}, (err, fetch) => {
    if (!err) resolve(fetch);
    reject(err);
  });
});

const getIdFromProfile = (firstName, lastName) => new Promise((resolve, reject) => {
  const condition = { 'info.first_name': firstName, 'info.last_name': lastName };
  Profile.findOne(condition, (err, profile) => {
    if (!err) resolve(profile.messenger_id);
    reject(err);
  })
});

const updateTimeStamp = (id, updatedTime) => new Promise((resolve, reject) => {
  Fetch.update({ _id: id }, { $set: { last_fetch: updatedTime } }, (err) => {
    resolve();
  })
})

const checkTimeStamp = (a, b) => moment(a).unix() > moment(b).unix();

const getPostUrl = id => {
  const sid = id.split('_');
  return `https://www.facebook.com/groups/${sid[0]}/permalink/${sid[1]}/`
}

setInterval(() => {
  console.log('fetch')
  doQuery()
  .then(fetch => {
    fetch.forEach(f => {
      const { _id, group_id, keyword, access_token, firstName, lastName } = f;
      getIdFromProfile(firstName, lastName)
      .then(chatId => {
        console.log(chatId)
        doRequest('https://graph.facebook.com/v2.10/' + group_id + '/feed?access_token=' + access_token)
        .then(body => {
          const { data } = JSON.parse(body);
          data.forEach(post => {
            console.log(post.message)
            console.log(">>>>>>", keyword)
            if (post.message && post.message.indexOf(keyword) !== -1 && checkTimeStamp(post.updated_time, f.last_fetch)) {
              console.log('success', post);
              updateTimeStamp(_id, post.updated_time)
              .then(() => {
                noti({
                  "recipient": {
                    "id": chatId
                  },
                  "message": {
                    "text": 'เจอแล้ว! \n' + getPostUrl(post.id)
                  }
                })
              })
            }
          });
        });
      })
    });
  }).catch(err => {
    console.log(err);    
  });
}, 2000);


