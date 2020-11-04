var mysql = require("mysql");
var firebase = require("firebase");
var cors = require('cors');

// database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@55w0rd",
  insecureAuth: true,
  database: "Mani"
});
con.connect();
const express = require("express");
const session= require("express-session");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
const port = 8080;
firebase.initializeApp({

});

var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);

var Strategy = require('passport-local').Strategy;

  
  // logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));

var options ={
  host: "localhost",
  user: "root",
  password: "P@55w0rd",
  // insecureAuth: true,
  database: "Mani"
};
// var sessionStore = new MySQLStore(options);
var sessionStore = new MySQLStore(options);
app.use(session({ 
  secret: 'keyboard cat',   
  resave: false, 
  store: sessionStore,
  saveUninitialized: false ,
  // cookie:{secure:True}
} ));
app.use(passport.initialize());
app.use(passport.session());
// app.get("/", function(req, res){
//   console.log("hiii",__dirname);
//   res.sendFile('/Users/shirishakodimala/Desktop/manikantafiles/nodesqlconnector/login.html');
//   //res.render("login",function(err,html){
//     //if(err) console.log(err);
//     //console.log(html);
//  // });
// });
// var emp=[{name: "tesst", age: 20}, {name: "test2", age: 22}];
app.post("/register", (req, res) => {
    // console.log("here",req.body);
    var employeBody = req.body;
    bcrypt.hash(employeBody.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      con.query(`Insert into users values('${employeBody.name}','${employeBody.username}', '${hash}')`, function(err, result, felids) {
        if (err) throw err;
        res.setHeader('Access-Control-Allow-Origin', '*');
        //res.send(`hi ${employeBody.username} you form has been submitte successfully!!`);
    });
    con.query("select LAST_INSERT_ID() as user_id",function(error,result,felids){
      if (error) throw error;
      console.log("after posting", result[0]);
      // req.login(user_id,function(error){
      //   // res.redirect('/login.html');
      // });
      res.status(200).send({user_id: result[0]['user_id']});
    });
  });
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});


app.post("/login", (req, res) => {
  console.log("here",req.body);
  var employeBody = req.body;
  var email=employeBody.username;
  var password=employeBody.password;
  console.log("loging",email,password);
  res.send({status: false});
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
