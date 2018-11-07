exports.forgotpasswordResponse = function(req, res, next) {  
  
    var input=req.body;  
    //console.log(input);  
    async.waterfall([  
        function(done) {  
            crypto.randomBytes(20, function(err, buf) {  
                var token = buf.toString('hex');  
                done(err, token);  
            });  
        },  
        function(token, result, done,Username,password) {  
            
            var smtpTransport = nodemailer.createTransport({  
                service: 'gmail',  
                auth: {  
                  user: 'bonkgangbot@gmail.com',  
                  pass: 'Iamabot'  
                }  
              });  
  
            const mailOptions = {  
                to: emailVal,  
                from: 'bonkgangbot@gmail.com',  
                subject: 'Password Reset',  
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +  
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
            };  
            smtpTransport.sendMail(mailOptions, function(err) {                 
                console.log("HI:"+emailVal);  
                res.json({status : 'success', message : 'An e-mail has been sent to ' + emailVal + ' with further instructions.'});              
                done(err, 'done');  
            });  
        })  
        });  
        }  
          
    ], function(err) {  
        if (err) return next(err);  
          
    });  
}  
