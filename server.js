// Require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var inquirer = require("inquirer");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Set our port to 8080


var todoArray = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "readnwrite.html"));
  

connection.connect(function(err){
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  read();
});

function read() {
  connection.query("SELECT * FROM todolist;", function(err, result) {
    if (err) throw err;
    
    console.log(result);
 
    var i;
   

    for (i = 0; i < result.length; i++) { 
  console.log(i + 1 + ") " + result[i].task);
  todoArray.push(result[i].task)
 
}
console.log("This is the todo array " + todoArray)

app.get("/api/toDoList", function(req, res) {
  return res.json(todoArray);
});



  });
}

});



//*************
//**************
//*************
//*************
//**************
//*************


app.get("/read", function(req, res) {

res.sendFile(path.join(__dirname, "read.html"));

// var todoArray = [];

//I think this "connect" is the handshake.  I need to make sure this only activates
//if the handshake has not already been invoked
  connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  read();
});


function read() {
  connection.query("SELECT * FROM todolist;", function(err, result) {
    if (err) throw err;
    
    console.log(result);
    //okay, so I can get it to log on the command window, but getting it 
    //to show up on the webpage, that's a different beast
    //

    // res.json(result[1].task);
    //this prints the second task, but I would need to know how many ti
    // connection.query("SELECT id FROM todolist;", function (err, idList){
    var i;
    // console.log(idList.length);
    // var maxid = idList.length;
    //okay so I got an array of ids, then got length to get the maxid
    //but it still doesn't print out stuff to the page
    //even though the length of the 
    //waitt, all this is useless.

    for (i = 0; i < result.length; i++) { 
  console.log(i + 1 + ") " + result[i].task);
  todoArray.push(result[i].task)
  //okay, so we've put all the tasks in an array.  Now if the Star Wars program
  //is any indication, I have to transfer this array to the read.html page, the same
  //way Star Wars transfers it to the view.html page.
}
console.log("This is the todo array " + todoArray)

// todoArrayObject = [{item: 'bouncing balls'}]
app.get("/api/toDoList", function(req, res) {
  return res.json(todoArray);
});

// for (i = 0; i < result.length; i++) { 
//   res.json(result[i].task);
// }
//this only prints the first one.  Weird.

    // connection.end();
  // });
  });
}

});






app.get("/write", function(req, res) {
  res.sendFile(path.join(__dirname, "write.html"));
});

app.get("/test", function(req, res) {

  var myHTML = 
  "<html lang='en'>" + 
"<head>" + 
"<meta charset='UTF-8'>" +
  "<title>Coding To Do List</title>" +
    "<script src='https://code.jquery.com/jquery.js'></script>" +
"</head>" + 
"<body>" + 
"<b>TEST</b>" +
"</body>" +
"</html>";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(myHTML);
});

app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newItem = req.body;
  

  console.log(newItem.task);

  // connection.connect(function(err) {
  // if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  insertion();
// });


function insertion(inserted) {
  connection.query("INSERT INTO todolist (task) VALUES ('" + newItem.task + "');", function(err, res) {
    if (err) throw err;
    
    // console.log(res[0].task);
    connection.end();

  });
}

});

app.post("/api/delete", function(req, res) {

  var item2delete = req.body;
  //NOTE I MAY NEED TO MAKE item2delete AN OBJECT FOR THIS TO WORK
  console.log("The server has recieve the following:")
  console.log(item2delete);

//   connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   deletion();
// });

deletion();

function deletion() {
  connection.query("DELETE FROM todolist WHERE task ='" + item2delete.deleteThis + "';", function(err, res) {
    if (err) throw err;
    
    // console.log(res[0].task);
    connection.end();

  });
}

});




var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "codingtodo_db"
});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
