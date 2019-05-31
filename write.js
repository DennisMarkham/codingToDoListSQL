var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "codingtodo_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  ask();
});

function ask(){
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
       type: "input",
      message: "What's your next idea?",
      name: "new"
    }
    ]).then(function(inquirerResponse) {
      var inserted = inquirerResponse.new;
      insertion(inserted);
    })
}

function insertion(inserted) {
  connection.query("INSERT INTO todolist (task) VALUES ('" + inserted + "');", function(err, res) {
    if (err) throw err;
    
    // console.log(res[0].task);
    connection.end();
  });
}