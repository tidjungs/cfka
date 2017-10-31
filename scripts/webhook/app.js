const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN
const FACEBOOK_PAGE_TOKEN = process.env.FACEBOOK_PAGE_TOKEN

const MongoClient = require('mongodb').MongoClient
const MongoUrl = process.env.MONGO_URL

const insertProfile = (db, doc, callback) => {
  const collection = db.collection('profiles')

  collection.insertOne(doc, (err, result) => {
    if (err) {
      console.log(err)
    }

    console.log('Insert Profile')
    callback()
  })
};

const updateUserId = function(db, data, callback) {
  const collection = db.collection('fetches')
  const condition = {'firstName': data.first_name, 'lastName': data.last_name};

  collection.updateOne(condition, {$set: { "user_id": data.user_id }}, function(err, result) {
    if (err) {
      console.log(err)
      db.close()
    }

    callback()
  })
}

// const findProfile = (db, messenger_id, callback) => {
  // let profile = db.collection('profile').find({'messenger_id': messenger_id}).toArray()

  // console.log(profile)
  // callback();

  // cursor.each(function(err, doc) {
  //    if (doc != null) {
  //      callback(db, doc)
  //      count++;
  //    } else {
  //      done(count)
  //    }
  // })
// }

const listKeywordGroup = (db, messenger_id, callback) => {
  const fetches = db.collection('fetches').aggregate([
    {
        '$lookup': {
            'from': 'profiles',
            'localField': 'firstName',
            'foreignField': 'info.first_name',
            'as': 'profile'
        }
    },
    {
        '$match': {
          'profile.messenger_id': messenger_id
        }
    },
  ]).toArray().then((res) => {
    console.log(res);
    callback(res);
  });

  // console.log(fetches);

  // cursor.each(function(err, doc) {
  //    if (doc != null) {
  //      callback(db, doc)
  //      count++;
  //    } else {
  //      done(count)
  //    }
  // })
}

app.use(bodyParser.json())
app.get('/', (req, res) => {
  const messenger_id = '1548964558517548'
  const url = 'https://graph.facebook.com/v2.10/' + messenger_id + '?access_token=' + FACEBOOK_PAGE_TOKEN

  fetch(url)
  .then((res) => {
    return res.json()
  }).then((json) => {
    MongoClient.connect(MongoUrl, function(err, db) {
      // let doc = {
      //   'messenger_id': messenger_id,
      //   'info': json
      // }

      // insertProfile(db, doc, () => {
      //   console.log('Insert success')
      // })

      listKeywordGroup(db, messenger_id, () => {
        console.log('group');
      })
    })
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
          console.log(event.referral)

          if (event.referral.ref === 'hello') {
            // body.message = { text: 'Subscribed, thank you.' }

            fetch('https://graph.facebook.com/v2.10/' + event.sender.id + '?access_token=' + FACEBOOK_PAGE_TOKEN)
            .then((res) => {
              return res.json()
            }).then((json) => {
              MongoClient.connect(MongoUrl, function(err, db) {
                let doc = {
                  'messenger_id': event.sender.id,
                  'info': json
                }

                insertProfile(db, doc, () => {
                  console.log('Insert success')
                })
              })
            })

            fetch('https://graph.facebook.com/v2.10/me/messages?access_token=' + FACEBOOK_PAGE_TOKEN, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            })
          }

        } else if (event.message || event.postback) {
          if (event.message && event.message.text === 'cfka') {
            body.message = {
              'attachment':{
                'type':'template',
                'payload':{
                  'template_type':'button',
                  'text':'Do you want to subscribe, CFKA?',
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
          } else if (event.message && event.message.text === '#addkeyword') {
            /* For handle ADD */
          } else if (event.message && event.message.text === '#listkeyword') {
            MongoClient.connect(MongoUrl, function(err, db) {
              listKeywordGroup(db, event.sender.id, (lists) => {
                body.message = { text: lists.map((list) => (`keywords: ${list.keyword}\ngroup: www.facebook.com/${list.group_id}\n\n`)).join('') }

                fetch('https://graph.facebook.com/v2.10/me/messages?access_token=' + FACEBOOK_PAGE_TOKEN, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                })
              })
            });

            /* For handle LIST */
          } else if (event.message && event.message.text === '#deletekeyword') {
            /* For handle DELETE */
          } else if (event.postback && event.postback.payload === 'CONFIRM_REGISTER') {
            body.message = { text: 'Subscribed, thank you.' }

            fetch('https://graph.facebook.com/v2.10/' + event.sender.id + '?access_token=' + FACEBOOK_PAGE_TOKEN)
            .then((res) => {
              return res.json()
            }).then((json) => {
              MongoClient.connect(MongoUrl, function(err, db) {
                let doc = {
                  'messenger_id': event.sender.id,
                  'info': json
                }

                insertProfile(db, doc, () => {
                  console.log('Insert success')
                })
              })
            })

          } else if (event.postback && event.postback.payload === 'register') {
            body.message = { text: '[Register] Thank you.' }
          } else {
            body.message = { text: `${event.message.text} (id: ${event.sender.id})` }
          }
        }

        if (body.message !== null) {
          fetch('https://graph.facebook.com/v2.10/me/messages?access_token=' + FACEBOOK_PAGE_TOKEN, {
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
