var request = require('request');
var http = require('http');
var appconfig = require('../appconfig');
var utils = {};


utils.postToAuthServer = function(email, password,callback){
  var urlPath = 'http://localhost' + ':' + appconfig.AUTH_PORT + appconfig.AUTH_SERVER_API_AUTHENTICATE_USER;
  console.log(urlPath);
  var data = {
    "email_id" : email,
    "password" : password,
    "user_type" : "student"
  };

  /*var dataStr = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
}).join('&');

  console.log(dataStr);
  var byteData = toUTF8Array(dataStr);*/
  data = JSON.stringify(data);
  var post_options = {
    host : 'localhost',
    port : '4567',
    path : '/api/account/authenticateuser',
    method : 'POST',
    headers : {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };
  var d = ""
  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          d = chunk;
      });
  });
  post_req.write(data);
  post_req.end();

  callback(JSON.stringify(d));
}

function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

module.exports = utils;
