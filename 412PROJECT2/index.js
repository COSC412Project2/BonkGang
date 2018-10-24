/**
 * MAKE SURE TO INSTALL THE FOLLOWING DEPENDENCIES: 
 * express
 * body-parser
 * mysql
 * cryptr
 * jsonwebtoken
 */
var express=require("express");
var bodyParser=require('body-parser');
 
//Con is going to the config file 
var con  = require('./config');
var app = express();
 
var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//default route or main directory 
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
 
//route to the login page of the form
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})  
 
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(8080);