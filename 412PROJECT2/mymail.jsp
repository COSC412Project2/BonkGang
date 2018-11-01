<% 
mdjavahash md = new mdjavahash();
String smail =request.getParameter("email");
int profile_id = 0;
if(smail!=null)
{
 try{
// Register JDBC driver
Class.forName("com.mysql.jdbc.Driver");

 String sql1;
 sql1="SELECT  email FROM profile WHERE email = '"+smail+"'";

  ResultSet rs1=stmt.executeQuery(sql1);

if(rs1.first())
{
    String sql;
    sql = "SELECT Profile_id FROM profile where email='"+smail+"'";
     ResultSet rs2 = stmt.executeQuery(sql);

    // Extract data from result set
    while(rs2.next()){
       //Retrieve by column name
     profile_id  = rs2.getInt("Profile_id");
    }

    java.sql.Timestamp  intime = new java.sql.Timestamp(new 
    java.util.Date().getTime());
    Calendar cal = Calendar.getInstance();
    cal.setTimeInMillis(intime.getTime());
    cal.add(Calendar.MINUTE, 20);
    java.sql.Timestamp  exptime = new Timestamp(cal.getTime().getTime());

    int rand_num = (int) (Math.random() * 1000000);
    String rand = Integer.toString(rand_num);
    String finale =(rand+""+intime); // 
    String hash = md.getHashPass(finale); //hash code

    String save_hash = "insert into  reset_password (Profile_id, hash_code, 
   exptime, datetime) values("+profile_id+", '"+hash+"', '"+exptime+"', 
   '"+intime+"')";
    int saved = stmt.executeUpdate(save_hash);
    if(saved>0)
    {
  String link = "http://localhost:8080/Infoshare/reset_password.jsp";     
  //bhagawat till here, you have fetch email and verified with the email 
 from 
  datbase and retrived password from the db.
    //-----------------------------------------------
String host="", user="", pass=""; 
host = "smtp.gmail.com"; user = "example@gmail.com"; 
//"email@removed" // email id to send the emails 
pass = "xxxx"; //Your gmail password 
String SSL_FACTORY = "javax.net.ssl.SSLSocketFactory"; 
String to = smail;  
String from = "example@gmail.com";  
String subject = "Password Reset"; 
 String messageText = " Click <a href="+link+"?key="+hash+">Here</a> To 
  Reset 
  your Password. You must reset your password within 20 
  minutes.";//messageString; 
   String fileAttachment = ""; 
   boolean WasEmailSent ; 
  boolean sessionDebug = true; 
  Properties props = System.getProperties(); 
  props.put("mail.host", host); 
  props.put("mail.transport.protocol.", "smtp"); 
  props.put("mail.smtp.auth", "true"); 
  props.put("mail.smtp.", "true"); 
  props.put("mail.smtp.port", "465"); 
  props.put("mail.smtp.socketFactory.fallback", "false"); 
  props.put("mail.smtp.socketFactory.class", SSL_FACTORY); 
  Session mailSession = Session.getDefaultInstance(props, null); 
  mailSession.setDebug(sessionDebug); 
  Message msg = new MimeMessage(mailSession); 
  msg.setFrom(new InternetAddress(from)); 
  InternetAddress[] address = {new InternetAddress(to)}; 
  msg.setRecipients(Message.RecipientType.TO, address); 
  msg.setSubject(subject); 
  msg.setContent(messageText, "text/html");  
  Transport transport = mailSession.getTransport("smtp"); 
  transport.connect(host, user, pass);
    %>
 <div class="alert success" style="padding: 30px; background-color: grey; 
  color: white; opacity: 1; transition: opacity 0.6s; width:50%; margin: 10% 
 5% 
15% 20%;">
 <a href="forgotpassword.jsp"> <span class="closebtn" style="color: white; 
font-weight: bold; float: right; font-size: 40px; line-height: 35px; cursor: 
pointer; transition: 0.3s;">&times;</span> </a> 
 <h1 style="font-size:30px;">&nbsp;&nbsp; <strong>Check Your Email. Link To 
Reset Your Password Is Sent To : <%out.println(" "+smail); %></strong>  
</h1>
 <center><a href="forgotpassword.jsp"><h2><input type="button" value="OK"> 
</h2></a></center>
</div>
<%
try { 
transport.sendMessage(msg, msg.getAllRecipients()); 
WasEmailSent = true; // assume it was sent 
} 
catch (Exception err) { 
WasEmailSent = false; // assume it's a fail 
} 
 transport.close();
    //-----------------------------------------------
 }  
}   

 else{
    %>
    <div class="alert success" style="padding: 30px; background-color: grey; 
 color: white; opacity: 1; transition: opacity 0.6s; width:50%; margin: 10% 
 5% 15% 20%;">
     <a href="forgotpassword.jsp"> <span class="closebtn" style="color: 
 white; font-weight: bold; float: right; font-size: 40px; line-height: 35px; 
 cursor: pointer; transition: 0.3s;">&times;</span> </a> 
     <h1 style="font-size:30px;">&nbsp;&nbsp; <strong>There Is No Email As 
 Such <%out.println(" "+smail); %></strong>Try Again  </h1>
     <center><a href="forgotpassword.jsp"><h2><input type="button" 
 value="OK"></h2></a></center>
    </div>
    <%      
 }  

stmt.close();
rs1.close();
conn.close();
}catch(SQLException se){
//Handle errors for JDBC
se.printStackTrace();
}catch(Exception e){
//Handle errors for Class.forName
e.printStackTrace();
}
}
 else{
    %>
 <div class="alert success" style="padding: 30px; background-color: grey; 
 color: white; opacity: 1; transition: opacity 0.6s; width:50%; margin: 10% 
 5% 15% 20%;">
  <a href="forgotpassword.jsp"> <span class="closebtn" style="color: white; 
  font-weight: bold; float: right; font-size: 40px; line-height: 35px; 
 cursor: 
 pointer; transition: 0.3s;">&times;</span> </a> 
 <h1 style="font-size:30px;">&nbsp;&nbsp; <strong>Please Enter The Valid 
 Email Address</strong>  </h1>
 <center><a href="forgotpassword.jsp"><h2><input type="button" value="OK"> 
 </h2></a></center>
 </div>
  <%    
  }
  %> 
