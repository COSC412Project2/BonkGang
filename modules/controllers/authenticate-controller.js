var bcrypt = require('bcryptjs');
var mysql_query = require('../query');
var moment = require('moment');

//making sure the user has an account with email and password
module.exports.authenticate=function(req,res, callback){
  //store req vars
  var email = req.body.email;
  var password = req.body.password;

  //verify that user email is in an email format
  //regex matcher here

  //setup timestamp and log access attempt
  console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ": New authentication attempt:");
  console.log("email:\t\t" + email + "\nhashed password:\t" + bcrypt.hashSync(req.body.password));
   
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