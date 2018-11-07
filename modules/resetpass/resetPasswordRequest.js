var nodemailer = require('nodemailer');
var crypto = require('crypto');
var mysql_query = require('../query');

module.exports = function(req, res, callback) {  
  
    //ADD TIMESTAMP CONSOLE LOG STUFF


    //user input (email to be reset)
    var email = req.body.email;

    //generate random string to go with the email
    var token = crypto.randomBytes(20);
    token = token.toString('hex');

    var insert_me = {
        "email" : email,
        "token" : token
    };

    console.log("insert_me.email: " + insert_me.email);
    console.log("insert_me.token: " + insert_me.token);

    //set up nodemailer
    var smtpTransport = nodemailer.createTransport({  
        service: 'gmail',  
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

    //check if email exists already
    mysql_query("SELECT * FROM users WHERE email = ?", email, function(error, results){
        if (error) { //return error message
        console.log(error);
        callback(0);
        }else if(results.length >0){
            //found a matching email

            //add the email + token to database
            mysql_query("INSERT INTO pending_resets SET ?", insert_me, function(err, res){
                if(err) throw err;
                console.log("Email and token inserted successfully : " + insert_me);

                //Send the email
                console.log("Result: sending email reset code to: " + email + "\n");
                smtpTransport.sendMail(mailOptions, function(err) {
                    if(err) throw err;               
                    console.log("Email successfully sent to: " + email);
                    callback(1);
                });
            });
        }
        else if(results.length == 0){
        console.log("Result: no such email found, cant reset password");
        callback(2);
        }
    });
}  
