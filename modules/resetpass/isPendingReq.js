var mysql_query = require('../query');

module.exports = function (email, callback){
    mysql_query("SELECT * FROM pending_resets WHERE email = ?",email, function(err,results){
        if (err) throw err;
        else if (results.length == 0) {
           callback(false);
        }
        else {
          callback(true); 
        }
    });
}