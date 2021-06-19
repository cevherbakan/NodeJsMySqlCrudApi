var mysql = require('mysql');
const express = require('express');
const app = express();
const { body, validationResult, query } = require('express-validator');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"deneme123"
  });



app.get('/', (req, res) => {
    
  res.json({message: 'Please enter right url'})
});




//Fetch all users
app.get('/getAllUsers/', (req, res) => {

    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
          if (err) throw err;

          console.log(result);
          res.send(result)

        });
      });
});


//Fetch user by id
app.get('/getByIdUser/:id', 
(req, res) => {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users WHERE id='"+req.params.id+"' ", function (err, result, fields) {
          if (err) throw err;

          console.log(result);
          res.send(result)
        });
      });
});



//Create user

app.post('/createUser/',
body('firstName').isLength({ min: 3, max:255 }),
body('lastName').isLength({ min: 3, max:255 }),
body('email').isEmail(),
body('balance').isNumeric(),
body('birthday').isDate(),
(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var sql = "INSERT INTO users (firstName,lastName, birthday,balance,email) VALUES ('"+
     req.body.firstName+"','"+ req.body.lastName+"','"+ req.body.birthday+"',"+ req.body.balance+",'"+ req.body.email+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Create is successful");
    });

  res.status(201).json(req.body)
});



//Update user
app.put('/updateUser/', 
body('id').isNumeric(),
body('firstName').isLength({ min: 3, max:255 }),
body('lastName').isLength({ min: 3, max:255 }),
body('email').isEmail(),
body('balance').isNumeric(),
body('birthday').isDate(),
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE users SET firstName = '"+req.body.firstName+"',"+
         "lastName = '"+req.body.lastName+"',"+
         "birthday = '"+req.body.birthday+"',"+
         "balance = "+req.body.balance+","+
         "email = '"+req.body.email+"' WHERE id = '"+req.body.id+"' ";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(result.affectedRows + " Update is successful");
        });
      });

res.status(201).json(req.body)
});



//Delete user by id
app.delete('/deleteUser/:id', 
(req,res)=>{

con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM users WHERE id = '"+req.params.id+"' ";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Delete result: " + result.affectedRows);
  });
});

res.json({message: 'Delete is successful'})
});


app.listen(3000);