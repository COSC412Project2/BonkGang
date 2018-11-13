//requires
const express = require("express");
const bodyParser = require('body-parser');
const authenticateController=require('./modules/controllers/authenticate-controller');
const registerController=require('./modules/controllers/register-controller');
const forgotpassword = require('./modules/resetpass/resetPasswordRequest');
const moment = require('moment');
const isValidToken = require("./modules/resetpass/isValidResetToken");

//misc express config
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//port app listens on
const PORT = 8080;

//====================ROUTING===================================
//DEFAULT LOGIN PAGE
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index.html"); 
})

//registration page
app.get('/register', function(req,res){
    res.sendFile(__dirname + "/views/register.html");
});

//forgot password page
app.get('/forgot', function(req,res){
    res.sendFile(__dirname + "/views/resetrequest.html");
});

//once user follows email link, they are sent here
app.get('/reset/:token', function(req,res){
    //check if valid token
    var token = req.params.token;
    isValidToken(token, function(code, email){
        switch(code){
            case 0: res.sendFile(__dirname + "/views/404.html");break;
            case 1: res.render("resetpass", {email});break;
        }
    });
});

app.get('/jade_test/:id', function(req,res){
    res.render("test", {data : [req.params.id]});
});

//Registration POST request, send req to REGISTRATIONCONTROLLER and change res based on results
app.post('/register', function(req,res){
    registerController(req,res, function(code){
        res.set("Content-type", "application/json");
        switch (code){
            case 0 : res.status(500).json({"code" : "0", "message" : "SQL Query Error"});break;
            case 1 : res.status(200).json({"code" : "1", "message" : "User successfully Registered"});break;
            case 2 : res.status(400).json({"code" : "2", "message" : "Email already registerd"});break;
        }
    })
});

//Authentication POST request, Send req to AUTHENTICATECONTROLLER and change res based on results
app.post('/auth',function(req,res){
    authenticateController(req,res, function(code){
        res.set("Content-type", "application/json");
        switch(code){
            case 0 : res.status(500).json({"code" : "0", "message" : "SQL Query Error"});break;
            case 1 : res.status(200).json({"code" : "1", "message" : "User successfully authenticated"});break;
            case 2 : res.status(400).json({"code" : "2", "message" : "incorrect password"});break;
            case 3 : res.status(400).json({"code" : "3", "message" : "no such email found"});break;
        }
    });
});

//reset password POST for opening a request 
app.post('/resetrequest', function(req,res){
    callback = false;
    forgotpassword(req,res, function(code){
        callback = true;
        res.set("Content-type", "application/json");
        switch(code){
            case 0 : res.status(500).json({"code" : "0", "message" : "Server error"});break;
            case 1 : res.status(200).json({"code" : "1", "message" : "Password reset email sent"});break;
            case 2 : res.status(400).json({"code" : "2", "message" : "Email does not match any existing records"});break;
            case 3 : res.status(400).json({"code" : "3", "message" : "Already a pending reset request for that email"});break;
        } 
    });
});

app.post('/changepass', function(req,res){
    console.log("POST: '/changepass' recieved: \n" + req.body.email + " " + req.body.password);
    res.status(200).json({"message" : "recieved"});
});

//PORT
app.listen(PORT, function(){
    var date = new Date();
    console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + 
    ": server listening on port " + PORT +"\n");
    console.log('link => http://localhost:'+PORT+'/')
})