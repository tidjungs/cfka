import request from 'request'

const facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN
// const noti = (conversation_id, message) => {
//   axios.post(`https://graph.facebook.com/v2.10/${conversation_id}/messages`, {
//     message: message,
//     access_token: accessToken
//   })
//   // .then(function (response) {
//   //   console.log(response);
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });
// }

const noti = message => {
  const url = `https://graph.facebook.com/v2.10/me/messages?access_token=${facebookAccessToken}`;
  const options = {
    method: 'post',
    contentType: 'application/json',
    body: message,
    json: true,
    url: url,
  }

  request(options, function(err, res, body) {
    console.log(res.statusCode);
  })

}

export default noti;
