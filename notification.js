var axios = require('axios')

function notification(conversation_id, message) {
  axios.post(`https://graph.facebook.com/v2.10/${conversation_id}/messages`, {
    message: message,
    access_token: 'EAAB4baPzk4QBAPI5MMZA8kxXnesF4uGnPgbsZA2p0QpzP9KvRpCNmdcCnb65l901Gpp7btmZCQ7SIC0eNqamWlVDH45cZAWi1FUhUYIeqmt53pEe75ud3FSJkEu6p0zBhwrP5t07nFpwg07G9dcoZAsm3eQLPxCX9nwXbjXbqB7dNxZBluFcGe8UnzxJ1rIEppD8navDz89gZDZD'
  })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}

notification('t_100009653051829', 'haha123dfjkdfjdkfj')
