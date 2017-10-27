import request from 'request';

request('https://graph.facebook.com/v2.10/1924443867832338/feed?access_token=EAACEdEose0cBABznZCDUScAGClvf57kIe8mBLfA3ZCGLne6aU4G4OmJQ1xBy7Ta3HGPV6KYUxNVgek4h2dUvjndHgZAZAaUH8eZBeJRYwZBzDZBHHpUHjk4Qdm6jzdE9ghREfCm6jGBguHZBK2VXlrK5gg4l927Seq6BgcCfdaxTFZBsTdHmWxnzl4iBmU1h2dMAZD', function (error, response, body) {
  // console.log('error:', error); 
  // console.log('statusCode:', response && response.statusCode);
  console.log('body:', body); 
});