var mysql = require('mysql');




var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"database"
});


//For Create Table

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

      var sql = "CREATE TABLE users ("+
      "id int NOT NULL AUTO_INCREMENT PRIMARY KEY,"+
        "firstName VARCHAR(255) NOT NULL,"+
        "lastName VARCHAR(255) NOT NULL,"+
         "birthday DATE NOT NULL,"+
         "balance DECIMAL(5,2) NOT NULL,"+
         "email VARCHAR(255) NOT NULL,"+
         "reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
      conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


