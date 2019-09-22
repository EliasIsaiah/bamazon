// const warehouse = {

//     productsArr: [],

//     ackMessage: function (message) {
//         inquirer.prompt([{
//             type: "list",
//             name: "acknowledge",
//             message: message,
//             choices: ["back to home", "exit"]
//         }]).then((answers) => {
//             if (answers.acknowledge === "exit") process.exit();
//             this.showTable();
//         })
//     },

//     showTable: function () {

//         const productTable = new Table({
//             head: ['ID', 'NAME', 'PRICE($)','DEPARTMENT', 'ONHAND']
//         });

//         connection.query(

//             `SELECT * FROM products
//             ORDER BY department_name`,
            
//             (err, results) => {
//                 if (err) reject(err);
//                 results.map((item) => {

//                     id = item.item_id;
//                     name = item.product_name;
//                     dept = item.department_name;
//                     price = item.price;
//                     onHand = item.stock_quantity;

//                     productTable.push(
//                         [id, name, price, dept, onHand]
//                     )
//                 })

//                 console.log(`
// ██████╗  █████╗ ███╗   ███╗ █████╗ ███████╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔══██╗████╗ ████║██╔══██╗╚══███╔╝██╔═══██╗████╗  ██║
// ██████╔╝███████║██╔████╔██║███████║  ███╔╝ ██║   ██║██╔██╗ ██║
// ██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║ ███╔╝  ██║   ██║██║╚██╗██║
// ██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗╚██████╔╝██║ ╚████║
// ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝                                                              
//             `)
//                 console.log(productTable.toString());
//                 customer.gatherCustData();

//             }
//         );

//     },

//     tryBuy: function (id, qty) {
//         console.log("adding item");

//         connection.query(
//             `SELECT * from products
//             WHERE item_id=${id}`,


//             (err, results) => {

//                 if (err) throw err;

//                 let stockQty = results[0].stock_quantity;
//                 let stockName = results[0].product_name;

//                 if (results[0].stock_quantity < qty) {

//                     this.ackMessage(`The warehouse only has ${stockQty} ${stockName}s in stock`)
//                 }
//                 else {
//                     let newOnHand = stockQty - qty;

//                     connection.query(

//                         `UPDATE products SET stock_quantity=${newOnHand} WHERE item_id=${id}`,
//                         (err) => {
//                             if (err) throw err;
//                             this.ackMessage("transaction complete");
//                         }
//                     )
//                 }
//             }
//         )
//     },
// }