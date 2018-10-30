/**
 * MAKE SURE TO INSTALL THE FOLLOWING DEPENDENCIES: 
 * express
 * body-parser
 * mysql
 * cryptr
 * jsonwebtoken
 */

//requires
const express = require("express");
const bodyParser = require('body-parser');

//set up
const app = express();
const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');
 
//misc config
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//====================ROUTING===================================
//default route or main directory 
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  

//route to the login page of the form
app.get('/login', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})

/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);

app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

//PORT
app.listen(8080);