import request from 'request';

const keyword = 'dmsakldnsakldnskal';
const access_token = 'EAAB5ij8RTdUBAB8tda1qi6OPbJOEdyhOAVzcJqsSYNPhEm1HQpPoN1WEHKRChC9S005ZClUDF5c6Ylx7SYw8uPOZBeukm466P2EjQzGoNWqZAmHy7x3e1T5KrIvleqYHqAvdHXGoFnSm6et5Jx9xJAhv6M3hzMZD';

const doRequest = url => new Promise((resolve, reject) => {
  request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      resolve(body);
    } else {
      reject(err);
    }
  });
})

setInterval(() => {
  console.log('request');
  doRequest('https://graph.facebook.com/v2.10/1924443867832338/feed?access_token=' + access_token)
  .then(body => {
    const { data } = JSON.parse(body);
    data.forEach(post => {
      if (post.message && post.message.indexOf(keyword) !== -1) {
        console.log(post.message);
      }
    });
  }).catch(err => {
    console.log(err);
  })
}, 2000)
