var mysql_query = require('../query');

module.exports = function(token, callback){
    //ADD TIMESTAMP CONSOLE LOG THING

    
    //query db for token
    mysql_query("SELECT * FROM pending_resets WHERE token = ?", token, function(err, results){
        if(err) throw err;
        else if(results.length == 0){
            //no pending request 
            console.log("no request found for token: " + token);
            callback(0, null);
        }
        else if(results.length == 1){
            //ALSO CHECK TIMESTAMP HERE TOO


            console.log("pending request found for token: " + token + "\nemail: " + results[0].email);
            callback(1, results[0].email);
        }
    });

}