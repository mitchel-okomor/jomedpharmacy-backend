<<<<<<< HEAD
const mysql = require('mysql');
=======
var mysql = require('mysql');
>>>>>>> products



const db = mysql.createConnection({
<<<<<<< HEAD
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petros'
=======
    host: "localhost",
    user: "root",
    password: "",
    database: "jomed"
>>>>>>> products
  });
  
  db.connect(function(err) {
    if (err) throw err;
<<<<<<< HEAD
    console.log('Connected to database!');
=======
    console.log("Connected to database!");
>>>>>>> products
  });


  module.exports=db;