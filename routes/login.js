var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var appconfig = require('../appconfig');

router.post('/',function(req,res){
  console.log("Incoming login request");
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  var data = {};
  if (verifyUser(email,password)) {
    data = {
      success : true,
      message : "Login successful"
    };
  }
  else {
    data = {
      success : false,
      message : "Invalid emaid id or password"
    };
  }
  res.send(data);
  /*utils.postToAuthServer(email, password, function(response){
    console.log("login page");
    data = {
      success : true,
      is_error : false
    }
    res.send(data);
    console.log("zz");
  });*/
});

module.exports = router;

function verifyUser(username,password) {
  for (var key in appconfig.users) {
    if (key === username) {
      return bcrypt.compareSync(password, appconfig.users[key]);
    }
    return false;
  }
}
