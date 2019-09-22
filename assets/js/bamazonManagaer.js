const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const warehouse = require("bamazonCustomer.js");

const manager = {

    gatherManagerData: function () {
        inquirer.prompt([{
            type: "list",
            name: "managerChoice",
            message: "Input the Product ID of the Product you would like to buy",
            choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new Product"]
        },
    ]).then((answers) => {
            console.log(answers);

            switch(answers.managerChoice) {
                
                case "View products for sale":
                    console.log("view products for sale");
                    warehouse.showTable();
                    break;
                case "View low inventory":
                    console.log("view low inventory");
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
    },
}
