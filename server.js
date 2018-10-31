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
const path = require('path');
const SSE = require('sse-nodejs');

//set up
const app = express();
const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');
 
//misc express config
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//====================ROUTING===================================
//default route or main directory 
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html"); 
})


//route to the login page of the form
app.get('/login', function (req, res) {  
    res.sendFile( __dirname + "/" + "login.html" );  
})

/* route to handle login and registration */
app.post('/register',registerController.register);
app.post('/auth',function(req,res){
    var auth = authenticateController.authenticate(req,res);
    switch(auth){
        case -1 : {
            res.status(500).json({error : "SQL Query Error"});
            break;
        }
        case 1 : {
            res.status(200).json({message : "User successfully authenticated"});
            break;
        }
        case 2 : {
            res.status(401).json({error : "incorrect password"});
            break;
        }
        case 0 : {
            res.status(401).json({error : "no such email found"});
            break;
        }
    }
});

//PORT
app.listen(8080, function(){
    console.log("server listening on port 8080");
})