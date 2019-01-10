//Establishing packages for application development
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

//Establishing color themes to provide focus.
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// Establish Mysql:bamazon_db database connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});
//User purchase function - Prompt user by items to purchase
function promptForPurchase () {
   
  //Prompt the user to select an item code
  inquirer.prompt([
    {
      type:"input",
      name:"item_id",
      message: "Please enter an item ID number that you wish to purchase. ".help,
      filter: Number
    },
    {
      type: "input",
      name: "quantity",
      message: "How many items do you need to order ?".help,
      filter: Number
      
    }
  ]).then(function(input){
  
      var item = input.item_id;
      var quantity = input.quantity;

      //Query the database to verify that the item exist with the requied quantity.
      var queryData = "SELECT * FROM products WHERE ?";
      connection.query(queryData, {item_id: item}, function (err, data) {
         if (err) throw err;
         
         // if the user enters an invalid item ID, data array will be empty.
         if (data.length === 0){
             console.log("ERROR: Invalid Item ID. Please select a correct item ID".red)
             showInventory();
         } else {
            var productData = data[0];


            if(quantity <= productData.stock_quantity) {
              console.log("We are placing your order. Congratuatlations your order is being placed.".info);

              //Build query to update data
              var updateQuantity = "UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item;;
               connection.query(updateQuantity, function(err, data) {
                 if (err) throw err;

                      console.log("The order has been placed. Your total is $" + productData.price * quantity);
                      console.log("Thank you for your business!!");
                      console.log("\n-----------------------------------------------------\n");

                 //Stop the database connection
                 connection.end();
               })
            } else {
                 //Communicate Insufficent quantity to clients and show inventory. 
              console.log("Sorry, but there is Insufficent quantity to meet your order".error);
              console.log("Please make modifications to your order.");
              console.log("\n------------------------------------------------\n");

              showInventory();
            }
         }
      })
  })
}

//Diaplay inventory within the BAMAZON database
function showInventory() {

  //query database
  connection.query("SELECT * FROM products", function(err,data) {
       if (err) throw err;

       console.log("Existing Inventory:");
       console.log("--------------------\n");

       var outPut = "";
       for (var i = 0; i<data.length; i++){
         outPut = "";
         outPut += "Item ID: " + data[i].item_id + " // ";
         outPut += "Product Name: " + data[i].product_name + " // ";
         outPut += "Department: " + data[i].department_name + " // ";
         outPut += "Price: $" + data[i].price + "\n";
        // outPut += "quantity: " + data[i].stock_quantity + "\n";

         console.log(outPut);
         
       }
        console.log("----------------------------------------------\n");
    //Prompt the user for item and quantity.
    promptForPurchase ();

    //connection.end();
})
}
//Start the Bamazon game
function initiateGame () {
  //display available inventroyy
  showInventory();
}
//Start the gane
initiateGame();
 