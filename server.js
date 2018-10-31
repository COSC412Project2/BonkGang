//requires
const express = require("express");
const bodyParser = require('body-parser');
const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');

//misc express config
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
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

//REGISTRATION PAGE
app.get('/register', function(req,res){
    res.sendFile(__dirname + "/views/register.html");
})

//Registration POST request, send req to REGISTRATIONCONTROLLER and change res based on results
app.post('/register', function(req,res){
    registerController.register(req,res, function(code, msg){
        res.set("Content-type", "application/json");
    })
});

//Authentication POST request, Send req to AUTHENTICATECONTROLLER and change res based on results
app.post('/auth',function(req,res){
    authenticateController.authenticate(req,res, function(auth){
        res.set("Content-type", "application/json");
        switch(auth){
            case 0 : res.json({"code" : "0", "message" : "SQL Query Error"});break;
            case 1 : res.json({"code" : "1", "message" : "User successfully authenticated"});break;
            case 2 : res.json({"code" : "2", "message" : "incorrect password"});break;
            case 3 : res.json({"code" : "3", "message" : "no such email found"});break;
        }
    });
});

//PORT
app.listen(PORT, function(){
    var date = new Date();
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +
    '.' + date.getMilliseconds() + ' ' + date.toDateString() + 
    ": server listening on port " + PORT +"\n");
})