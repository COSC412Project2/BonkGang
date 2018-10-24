//File is used to setup and connect to the database 
/*Change to your own mysql credentials
*/
var mysql    = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Coding4life!@19",
    database: "mydb"
  });
con.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = con; 