const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

const VERIFY_TOKEN = 'this_is_token'
const TOKEN_PAGE = 'EAAB4baPzk4QBAMsTzuNZAdxZB2gccCnqyH5CSJnt8ptEwtMsIy60mycZCxlGN90oAqBSTLmkfNO4xZBhFYbgfcJxt6HOrBqLznLQKPwozEWPLEE5iPriRagka3YRa2XwLaQFAJZCTdi82rqUJCcxHi0ZCiRZAZCb1NkmwcThYMuxQKr6MK7hpGaY'

app.use(bodyParser.json())
app.get('/', (req, res) => {

  const body = {
    'recipient': {
      'id': '1548964558517548'
    },
    'message': {
      'text': 'สวัสดี2'
    }
  };

  fetch('https://graph.facebook.com/v2.9/me/messages?access_token=' + TOKEN_PAGE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((res) => {
      console.log(res.ok)
      console.log(res.status)
  })

  res.send('New, Hello World!')
})

app.get('/facebook/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge'])
  } else {
    res.status(403).send('Token validation failed')
  }
})

app.post('/facebook/webhook', (req, res) => {
  console.log('Message')
  let data = req.body

  console.log(JSON.stringify(data))

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        let body = {
          'recipient': {
            'id': event.sender.id
          },
          'message': null
        };

        if (event.referral) {
          console.log(event.referral);

          if (event.referral.ref === 'hello') {
            body.message = { text: '[Referral] Thank you.' }
          }

        } else if (event.message || event.postback) {
          if (event.message && event.message.text === 'cfka') {
            console.log('1')
            body.message = {
              'attachment':{
                'type':'template',
                'payload':{
                  'template_type':'button',
                  'text':'CFKA Register?',
                  'buttons':[
                    {
                      'type':'postback',
                      'title':'Sure',
                      'payload':'CONFIRM_REGISTER'
                    }
                  ]
                }
              }
            }
          } else if (event.postback && event.postback.payload === 'CONFIRM_REGISTER') {
            body.message = { text: '[Confirms] Thank you.' }
          } else if (event.postback && event.postback.payload === 'register') {
            body.message = { text: '[Register] Thank you.' }
          } else {
            body.message = { text: `${event.message.text} (id: ${event.sender.id})` }
          }
        }

        if (body.message !== null) {
          fetch('https://graph.facebook.com/v2.10/me/messages?access_token=' + TOKEN_PAGE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
        }
      })
    })
  }

  res.status(200).send()
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
