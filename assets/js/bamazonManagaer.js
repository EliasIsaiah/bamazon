const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const manager = {

    gatherManagerData: function () {
        inquirer.prompt([{
            type: "number",
            name: "productID",
            message: "Input the Product ID of the Product you would like to buy",
        },
    ]).then((answers) => {
            console.log(answers);

        })
    },
}
