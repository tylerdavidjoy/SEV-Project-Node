/* var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); */

var express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // For legacy browser support
}


var app = express();
const PORT = 3000;

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Church Management System." });
});

require("./routes/church.routes.js")(app);

// set port, listen for requests
app.listen(PORT, () => {
  if(process.env.NODE_ENV == 'development') //Reminder during development, does not run deployed
    console.log("Make sure Apache and MySQL are running via XAMPP");
  console.log("Server is running on port " + PORT + ".");
});

module.exports = app;
