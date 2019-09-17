var mysql = require("mysql");
const inquirer = require("inquirer");

//return results.map( r => r.item_name )
/* const chosenItem = results.find( r => r.item_name === answer.choice); */


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "testdb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
});