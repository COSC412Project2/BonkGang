var mysql_query = require('../modules/query');
var bcrypt = require('bcryptjs');
var moment = require('moment');
//sets the register time stamp and encrypts password 
module.exports.register=function(req,res, callback){
  //verify email is in email format

  //verify password meets requirements

  //hash the password before storing
  var encryptedString = bcrypt.hashSync(req.body.password);

  //SET to be inserted into mysql
  var user={
    "name":req.body.name,
    "email":req.body.email,
    "password":encryptedString,
    "created_at":moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    "updated_at":moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  }

  //timestamp log of regstartion attempt
  console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ": New registration attempt:");
  console.log("name:\t\t\t" + user.name);
  console.log("email:\t\t\t" + user.email);
  console.log("hashed password:\t" + user.password + "\n");


  var isDuplicate = true;
  //check first if the email is already registered
  mysql_query("SELECT * FROM users WHERE email = ?", user.email, function(error, results){
    if (error) { //return error message
      console.log(error);
      callback(0);
    }else if(results.length >0){
      //found a matching email
      console.log("Result: Email already registered: " + user.email + "\n");
      callback(2);
    }
    else if(results.length == 0){
      console.log("Result: no such email found, proceeding to register");
      isDuplicate = false;
    }
  });

  if(!isDuplicate){
    //query used to insert a new user into the database 
    mysql_query('INSERT INTO users SET ?',user, function (error, results) {
      if (error) {
        callback(0);
        console.log(error);
      }else{
        callback(1);
        console.log("Result: user successfully registered\n")
      }
    });
  }
}
