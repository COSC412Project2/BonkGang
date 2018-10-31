var bcrypt = require('bcryptjs');
var mysql_query = require('../modules/query');

//making sure the user has an account with email and password
module.exports.authenticate=function(req,res, callback){
  
  var email = req.body.email;
  var password = req.body.password;

  //setup timestamp and log access attempt
  var date = new Date();
  console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +
  '.' + date.getMilliseconds() + ' ' + date.toDateString() + ": New authentication attempt:");
  console.log("email:\t\t" + email + "\npassword:\t" + req.body.password);
   
  //query that checks for the uers email and password and they are both valid within the database 
  mysql_query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
    if (error) { //return error message
      console.log("Result: " + error);
      callback(0);
    }else if(results.length >0){
      //password compared to stored (hashed) password using bcrypt.compareSync()
      if(bcrypt.compareSync(password,results[0].password)){
        console.log("Result: Login success\n");
        callback(1);
      }else{
        console.log("Result: login failed, mismatch\n");
        callback(2);
      }
    }else{
      console.log("Result: no such email found\n");
      callback(3);
    }
  });
}