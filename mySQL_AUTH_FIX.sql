/*This line fixes the unsupported auth mode error that mysql sometimes gives when 
the webpage tries to quesry the db
'root'@'localhost' and 'password' will need to be changed based on your
local mysql settings*/
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'