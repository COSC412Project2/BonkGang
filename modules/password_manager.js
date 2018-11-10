//modules to make use of
const mysql = require('./query');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment');


//our object to be exported
var password_manager = {};

//*********************************************************
//===============DEFINE FUNCTIONS BELOW====================
//*********************************************************

/*isValidResetToken
return the email if is valid token, returns null if not valid token*/
password_manager.isValidToken = function(token){
    //query pending_resets table for token and return the corresponding email
    var q = mysql.querySync("SELECT * FROM pending_resets WHERE token = ?", token);
    if(q.err){
        console.log("Error checking if valid password reset token:\n" + q.err);
        return null;
    }
    else if(q.results.length > 0){
        return q.results[0].email;
    }
    else return null;
}

/*REQUEST_RESET 
PARAM, email: email to send the reset token to
Adds a row to the pending_resets table in mysql
*/
password_manager.request_reset = function(email){
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
        auth: {  
          user: 'bonkgangbot2018@gmail.com',  
          pass: 'Iamabot2018'  
        }  
    });
    
    //define the receiver, sender, subject and message
    const mailOptions = {  
        to: email,  
        from: 'bonkgangbot2018@gmail.com',  
        subject: 'Password Reset',  
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
            'http://127.0.0.1:8080/reset/' + token + '\n\n' +  
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
    };

    //check if email exists in users table
    var q = mysql.querySync("SELECT * FROM users WHERE email = ?", email);
    //console.log("q = " + q);// + " q.err = " + q.err + " q.results = " + q.results
    if(q.err){
        console.log("Error requesting password reset at SELECT * FROM users:\n" + q.err);
        return 0;
    }
    else if(q.results.length == 0){
        console.log("password reset request failed, no such user");
        return 2;
    }

    //check if there is already a pending request for this email
    q = mysql.querySync("SELECT * FROM pending_resets WHERE email = ?", email);
    if(q.err){
        console.log("Error requesting password reset at SELECT * FROM pending_resets:\n" + err);
        return 0;
    }
    else if(q.results.length > 0){
        console.log("password reset request failed, already pending request");
        return 3;
    }

    //insert the request to pending_resets table
    q = mysql.querySync("INSERT INTO pending_resets SET ?",insert_me);
    if(q.err){
        console.log("Error requesting password reset at INSERT INTO pending_resets:\n" + err);
        return 0;
    }
    else{
        console.log("Email and token inserted successfully");
        //Send the email
        console.log("Result: sending email reset code to: " + email + "\n");
        smtpTransport.sendMail(mailOptions, function(err) {
            if(q.err) throw q.err;               
            console.log("Email successfully sent to: " + email);
            return 1;        
        });
    }
}

password_manager.change_password = function(email, password){
    //hash password
    hash_pw = bcrypt.hashSync(password);

    //check if email exists
    var q = mysql.querySync("SELECT * FROM users WHERE email = ?", email);
    if(q.err){
        console.log("Error updating password:\n" + q.err);
        return false;
    }
    else if(q.results.length == 0){//making sure the query did not return 0 results
        console.log("Change password attempt failed, No such email found");
        return false;
    }

    //insert the new password
    q = mysql.querySync("UPDATE users SET password = " + hash_pw + " WHERE email = ?", email);
    if(q.err){
        console.log("Error updating password:\n" + q.err);
        return false;
    }
    else{//no error means successfully inserted
        console.log(email + " password changed to " + hash_pw);
        return true;
    }
}

//export the module
module.exports = password_manager;