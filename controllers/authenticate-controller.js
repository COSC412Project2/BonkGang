//This varibale uses cryptyr module for encrypting the users password
var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var mysql_query = require('../modules/query');

//making sure the user has an account with email and password
module.exports.authenticate=function(req,res){
  //we dont want to handle the plain text, so we encrypt the plain text
  var email=req.body.email;
  var encryptedPassword= cryptr.encrypt(req.body.password);
   
  //query that checks for the uers email and password and they are both valid within the database 
  mysql_query('SELECT * FROM users WHERE email = ?',[email], function (error, results) {
    if (error) { //return error message
      res.json({
        status:false,
        message:'there are some error with query'
      })
    }else if(results.length >0){//encrpyted password compared to stored password
          if(encryptedPassword==results[0].password){
            res.json({
              status:true,
              message:'successfully authenticated'
            })
          }else{
            res.json({
              status:false,
              message:"Email and password do not match"
            });
          }
    }else{
      res.json({
        status:false,    
        message:"Email does not exits"
      });
    }
  });
}