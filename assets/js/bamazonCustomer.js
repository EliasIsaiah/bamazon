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


const warehouse = {

    productsArr: [],

    ackMessage: function (message) {
        inquirer.prompt([{
            type: "list",
            name: "acknowledge",
            message: message,
            choices: ["back to home", "exit"]
        }]).then((answers) => {
            if (answers.acknowledge === "exit") process.exit();
            this.showTable();
        })
    },

    showTable: function () {

        const productTable = new Table({
            head: ['ID', 'NAME', 'PRICE($)','DEPARTMENT', 'ONHAND']
        });

        connection.query(

            `SELECT * FROM products
            ORDER BY department_name`,
            
            (err, results) => {
                if (err) reject(err);
                results.map((item) => {

                    id = item.item_id;
                    name = item.product_name;
                    dept = item.department_name;
                    price = item.price;
                    onHand = item.stock_quantity;

                    productTable.push(
                        [id, name, price, dept, onHand]
                    )
                })

                console.log(`
██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                                                              
            `)
                console.log(productTable.toString());
                customer.gatherCustData();

            }
        );

    },

    tryBuy: function (id, qty) {
        console.log("adding item");

        connection.query(
            `SELECT * from products
            WHERE item_id=${id}`,


            (err, results) => {

                if (err) throw err;

                let stockQty = results[0].stock_quantity;
                let stockName = results[0].product_name;

                if (results[0].stock_quantity < qty) {

                    this.ackMessage(`The warehouse only has ${stockQty} ${stockName} in stock`)
                }
                else {
                    let newOnHand = stockQty - qty;

                    connection.query(

                        `UPDATE products SET stock_quantity=${newOnHand} WHERE item_id=${id}`,
                        (err) => {
                            if (err) throw err;
                            this.ackMessage("transaction complete");
                        }
                    )
                }
            }
        )
    },
}

const customer = {

    gatherCustData: function () {
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

            (warehouse.tryBuy(answers.productID, answers.qty))
        })
    },
}

warehouse.showTable();