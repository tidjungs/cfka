import request from 'request'

// const noti = (conversation_id, message) => {
//   axios.post(`https://graph.facebook.com/v2.10/${conversation_id}/messages`, {
//     message: message,
//     access_token: 'EAAB4baPzk4QBANq0Jibli0TlH9DXQLbWAZAlORjAdT3NLAtRSklgYS0QN8hjJh6hRoIAMq4GivX5FWvomyxpf6ZCE82JsIoKwNXPy93SYZCrhp1ZBKDTCTxXkczcHEMoNBiok5hDPQPe0OrHPygED0fUmX8FBSpgCZB9guJBdVx0ZBm3mf5FREGSELgYBhmrAt6OUbxSZCJmAZDZD'
//   })
//   // .then(function (response) {
//   //   console.log(response);
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });
// }


// var url = 'https://www.example.com'
// var options = {
//   method: 'post',
//   body: postData,
//   json: true,
//   url: url
// }
// request(options, function (err, res, body) {
//   if (err) {
//     console.error('error posting json: ', err)
//     throw err
//   }
//   var headers = res.headers
//   var statusCode = res.statusCode
//   console.log('headers: ', headers)
//   console.log('statusCode: ', statusCode)
//   console.log('body: ', body)
// })

const noti = message => {
  const url = 'https://graph.facebook.com/v2.10/me/messages?access_token=EAAB4baPzk4QBAMsTzuNZAdxZB2gccCnqyH5CSJnt8ptEwtMsIy60mycZCxlGN90oAqBSTLmkfNO4xZBhFYbgfcJxt6HOrBqLznLQKPwozEWPLEE5iPriRagka3YRa2XwLaQFAJZCTdi82rqUJCcxHi0ZCiRZAZCb1NkmwcThYMuxQKr6MK7hpGaY';
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