# CFKa
ระบบ Watch Facebook Post ที่สนใจ

## Support
- Facebook Group


## Deployment

### Setup Facebook webhook
Install node_modules
```
cd scripts/webhook
yarn install
```

Start webhook callback endpoint
```
node app.js
```

Start ngrox at port 3001
```
./ngrok http 3001
```

copy https link to Facebook webhook name **message**
https://developers.facebook.com/apps/132412297417604/webhooks/

### Start web server

```sh
yarn install
```

start api server on port 5000
```
yarn dev
```

start bot fetch
```
yarn bot
```

