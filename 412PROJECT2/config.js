var mysql      = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Coding4life!@19",
    database: "testdb"
  });
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection; 