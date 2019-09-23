const inquirer = require("inquirer");
const Table = require("cli-table");
const connection = require("./connection.js");

const manager = {

    standardHeaders: { head: ['ID', 'NAME', 'PRICE($)', 'DEPARTMENT', 'ONHAND'] },

    ackMessage: function () {
        inquirer.prompt([{
            type: "list",
            name: "navigate",
            choices: ["back to home", "exit"]
        }]).then((answers) => {
            if (answers.acknowledge === "exit") process.exit();
            this.gatherManagerData();
        })
    },

    pushToTable: function (data, table) {
        console.log(data);
        data.map((items) => {

            id = items.item_id;
            name = items.product_name;
            dept = items.department_name;
            price = items.price;
            onHand = items.stock_quantity;

            table.push(
                [id, name, price, dept, onHand]
            )
        })
    },

    showAllProducts: function () {

        console.log("All Products");

        const allProductsTable = new Table(this.standardHeaders);

        connection.query(`SELECT * FROM products`, (err, results) => {

            if (err) throw err;
            this.pushToTable(results, allProductsTable);
            console.log(allProductsTable.toString());
            this.ackMessage();
        })
    },

    checkLowInventory: function () {
        console.log("checking low inventory");

        const lowOnHand = new Table({
            head: ['ID', 'NAME', 'PRICE($)', 'DEPARTMENT', 'ONHAND']
        });

        connection.query(
            `SELECT * from products
            WHERE stock_quantity < 6`,

            (err, results) => {
                if (err) throw err;

                this.pushToTable(results, lowOnHand);
                console.log(lowOnHand.toString());
                this.ackMessage();
            }
        )
    },

    gatherManagerData: function () {
        inquirer.prompt([{
            type: "list",
            name: "managerChoice",
            message: "Choose an Action",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new Product"]
        },
        ]).then((answers) => {
            console.log(answers);

            switch (answers.managerChoice) {

                case "View products for sale":
                    console.log("view products for sale");
                    this.showAllProducts();
                    break;
                case "View low inventory":
                    console.log("view low inventory");
                    this.checkLowInventory();
                    break;
                case "Add to inventory":
                    console.log("add to inventory");
                    break;
                case "Add new Product":
                    console.log("Add new Product");
                    break;
                default:
                    console.log("invalid input", "defautl case reached");

            }

        })
    }
}

manager.gatherManagerData();