var mysql_query = require('../modules/query');
var bcrypt = require('bcryptjs');
//sets the register time stamp and encrypts password 
module.exports.register=function(req,res, callback){
  //date for timestamp
  var today = new Date();

  //hash the password before storing
  var encryptedString = bcrypt.hashSync(req.body.password);

  //SET to be inserted into mysql
  var user={
    "name":req.body.name,
    "email":req.body.email,
    "password":encryptedString,
    "created_at":today.getTime(),
    "updated_at":today.getTime()
  }

  //timestamp log of regstartion attempt
  console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +
  '.' + date.getMilliseconds() + ' ' + date.toDateString() + ": New registration attempt:");
  console.log("name:\t\t" + user.name);
  console.log("email:\t\t" + user.email);
  console.log("hashed password:\t" + user.password);

  //query used to insert a new user into the database 
   mysql_query('INSERT INTO users SET ?',user, function (error, results) {
    if (error) {
      callback(0, error);
    }else{
      callback(1, results);
    }
  });
}
