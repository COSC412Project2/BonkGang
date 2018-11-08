var nodemailer = require('nodemailer');
var crypto = require('crypto');
var mysql_query = require('../query');
var moment = require('moment');

module.exports = function(req, res, callback) {  
  
    //user input (email to be reset)
    var email = req.body.email;

    //generate random string to go with the email
    var token = crypto.randomBytes(20);
    token = token.toString('hex');

    //prepare data for query
    var insert_me = {
        "email" : email,
        "token" : token,
        "created_at" : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    };

    //ADD TIMESTAMP CONSOLE LOG STUFF
    console.log(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ": New resetPasswordRequest:");
    console.log("email:\t\t\t" + insert_me.email);
    console.log("token:\t\t\t" + insert_me.token + "\n");

    //set up nodemailer
    var smtpTransport = nodemailer.createTransport({  
        service: 'gmail',
        secure: false,
        auth: {  
          user: 'bonkgangbot2018@gmail.com',  
          pass: 'Iamabot2018'  
        }  
    });

    const mailOptions = {  
        to: email,  
        from: 'bonkgangbot2018@gmail.com',  
        subject: 'Password Reset',  
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +  
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
    };

    //check if email exists in USERS TABLE
    mysql_query("SELECT * FROM users WHERE email = ?", email, function(err, results){
        if (err) { //return error message
        console.log(err);
        callback(0);
        }else if(results.length >0){
            //found a matching email in USERS TABLE
            //check if already in PENDING_RESETS TABLE
            var isPendingAlready = true;
            mysql_query("SELECT * FROM pending_resets WHERE email = ?", email, function(err, results){
                if(err) throw err;
                else if(results.length == 0){
                    isPendingAlready = false;
                }
                else console.log("already a pending reset request for " + email); callback(3);
            });
            //add the email + token to PENDING_RESETS TABLE
            if(!isPendingAlready){
                mysql_query("INSERT INTO pending_resets SET ?", insert_me, function(err, res){
                    if(err) throw err;
                    console.log("Email and token inserted successfully");

                    //Send the email
                    console.log("Result: sending email reset code to: " + email + "\n");
                    smtpTransport.sendMail(mailOptions, function(err) {
                        if(err) throw err;               
                        console.log("Email successfully sent to: " + email);
                        callback(1);
                    });
                }); 
            }
            
        }
        else if(results.length == 0){
        console.log("Result: no such email found, cant reset password");
        callback(2);
        }
    });
}  
