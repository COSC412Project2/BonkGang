// Dependencies
var mysql   = require('mysql'),
    config  = require("../config");

/*
 * @sqlConnection
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
module.exports = function sqlConnection(sql, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    //establish connection
    var connection = mysql.createConnection(config);
    connection.connect(function(err) {
        if (err) throw err;
    });
    //do the query
    connection.query(sql, values, function(err, results) {
        //close the connection
        connection.end(); // close the connection

        if (err) throw err;

        // Execute the callback
        next.apply(this, arguments);
    });
}