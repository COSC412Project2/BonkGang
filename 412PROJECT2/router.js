app.route('/forgotpasswordResponse')  
.post(userCtrl.forgotpasswordResponse);
app.route('/reset/:token')  
.get(Resetpassword.resetpasswordResponse);
