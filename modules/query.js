// Dependencies
var mysql   = require('mysql'),
    config  = require("./config");

/*
 * @sqlConnection
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var sqlConnection = function sqlConnection(sql, values) {
    //establish connection
    var connection = mysql.createConnection(config);
    connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }
    });

    //do the query
    connection.query(sql, values, function(err) {
        //close the connection
        connection.end(); // close the connection

        if (err) {
            throw err;
        }
    });
}

module.exports = sqlConnection;