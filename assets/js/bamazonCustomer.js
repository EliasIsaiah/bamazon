const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

//return results.map( r => r.item_name )
/* const chosenItem = results.find( r => r.item_name === answer.choice); */


const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // connection.end();
});


const doQuery = function (command, input) {
    console.log("adding item");

    switch (command) {

        case "artist":

            let artistQuery = connection.query(
                `SELECT * FROM top_songs_table WHERE artist_name='${input}'`,
                (err, results) => {

                    if (err) throw err;
                    console.log(results);
                }
            );

            console.log(artistQuery.sql);
            break;

        case "range":

            let splitArr = input.split(",");
            let rangeQuery = connection.query(

                `SELECT * FROM top_songs_table WHERE ID BETWEEN ${splitArr[0]} AND ${splitArr[1]}`,
                (err, results) => {

                    if (err) throw err;
                    console.log(results);
                }
            );

            console.log(rangeQuery.sql);
            break;

        case "song":

            let songQuery = connection.query(

                `SELECT * FROM top_songs_table WHERE song_name='${input}'`,
                (err, results) => {

                    if (err) throw err;
                    console.log(results);
                }
            );

            console.log(songQuery.sql);
            break;
    }

    // console.log(query.sql);
}

const productTable = new Table({
    head: ['ID', 'NAME', 'PRICE($)']
    // colWidths: [10, 20, 10]   
});

console.log(`
██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                                                              
            `)

const initQuery = connection.query(

    `SELECT * FROM products`,
    (err, results) => {
        if (err) throw err;
        results.map((item, index) => {
            
            id = item.item_id;
            name = item.product_name;
            price = item.price;

            productTable.push(
                [id, name, price]
            )
        })
        console.log(productTable.toString());
        // console.log(results);
    }
);


