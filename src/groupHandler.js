var axios = require('axios')

function extractGroupIDFromUrl(url) {
  var regex = new RegExp('.+\\.com\\/groups\\/(.+)\\/')
  result = url.match(regex)

  // console.log(result[1])

  axios.get('https://graph.facebook.com/search', {
    params: {
      q: result[1],
      type: 'group',
      access_token: process.env.FACEBOOK_TOKEN
    }
  })
  .then(function (response) {
    console.log(response.data.data[0]);
    return response.data.data[0]
  })
  .catch(function (error) {
    console.log(error);
  });
}

extractGroupIDFromUrl('https://web.facebook.com/groups/starbucksthailandcollectors/?ref=bookmarks')
