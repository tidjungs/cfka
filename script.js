import request from 'request';
import noti from './noti';
// import mongoose from 'mongoose';
import Fetch from './src/model';

// mongoose.Promise = Promise;
const keyword = 'อาบน้ำ';
const access_token = 'EAAB5ij8RTdUBAB8tda1qi6OPbJOEdyhOAVzcJqsSYNPhEm1HQpPoN1WEHKRChC9S005ZClUDF5c6Ylx7SYw8uPOZBeukm466P2EjQzGoNWqZAmHy7x3e1T5KrIvleqYHqAvdHXGoFnSm6et5Jx9xJAhv6M3hzMZD';

// mongoose.connect('mongodb://eveem:12345e@ds229415.mlab.com:29415/cfka');


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
  Fetch.find({}, (err, data) => {
    console.log(data)
    if (!err) resolve(data);
    reject(err);
  });
});


setInterval(() => {
  // console.log('request');
  // doQuery()
  // .then(data => {
  //   console.log(data)
  // }).catch(() => {

  // });
  doRequest('https://graph.facebook.com/v2.10/1924443867832338/feed?access_token=' + access_token)
  .then(body => {
    const { data } = JSON.parse(body);
    data.forEach(post => {
      if (post.message && post.message.indexOf(keyword) !== -1) {
        console.log('success');
        noti({
          "recipient": {
            "id": "1688711797867394"
          },
          "message": {
            "text": 'เจอแล้ว!'
          }
        })
        // noti('t_100005738045773', post.message);
      }
    });
  }).catch(err => {
    console.log(err + "dsadsadsa");
  });
}, 2000);


