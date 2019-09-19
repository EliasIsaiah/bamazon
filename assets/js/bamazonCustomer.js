const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

//return results.map( r => r.item_name )
/* const chosenItem = results.find( r => r.item_name === answer.choice); */

const warehouse = {

    checkStock: function (id, qty) {
        console.log("adding item");

        const hasStock = connection.query(
            `SELECT stock_quantity from products WHERE item_id=${id}`,
            (err, results) => {
                if (err) return err;
                console.log(results);
            }
        )
    },
}

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

const gatherCustData = function () {
    inquirer.prompt([{
        type: "number",
        name: "productID",
        message: "Input the Product ID of the Product you would like to buy",
    },
    {
        type: "number",
        name: "qty",
        message: "How many would you like to buy?"
    }]).then((answers) => {
        console.log(answers);

        warehouse.checkStock(answers.productID, answers.qty);
    })
}


const productTable = new Table({
    head: ['ID', 'NAME', 'PRICE($)']
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
        console.log(productTable);
        gatherCustData();
        // console.log(results);
    }
);

