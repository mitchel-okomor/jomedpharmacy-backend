var mysql = require('mysql');



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jomed"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });


  module.exports=db;