var Cryptr = require('cryptr');
//var express=require("express");
var mysql_query = require('../modules/query');
// cryptr = new Cryptr('myTotalySecretKey');
 
//sets the register time stamp and encrypts password 
module.exports.register=function(req,res){
  var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var users={
    "name":req.body.name,
    "email":req.body.email,
    "password":encryptedString,
    "created_at":today,
    "updated_at":today
  }
    //query used to insert a new user into the database 
    mysql_query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}
