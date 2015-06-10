var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var login = require('./routes/login');

app.use(bodyParser.json());
app.use('/api/v0.1/login',login);










var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
