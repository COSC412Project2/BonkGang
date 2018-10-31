//This varibale uses cryptyr module for encrypting the users password
var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var mysql_query = require('../modules/query');

//making sure the user has an account with email and password
module.exports.authenticate=function(req,res){
  //we dont want to handle the plain text, so we encrypt the plain text
  var email=req.body.email;
  var encryptedPassword= cryptr.encrypt(req.body.password);

  console.log("email:" + email + "\npassword:" + req.body.password + "\nAttempting login\n");
   
  //query that checks for the uers email and password and they are both valid within the database 
  mysql_query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
    if (error) { //return error message
      console.log(error);
      return -1;
    }else if(results.length >0){//encrpyted password compared to stored password
          if(encryptedPassword==results[0].password){
            console.log("Login success");
            return 1;
          }else{
            console.log("login failed, mismatch");
            return 2;
          }
    }else{
      console.log("no such email found");
      return 0;
    }
  });
}