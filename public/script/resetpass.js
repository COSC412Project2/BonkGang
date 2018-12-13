var p1 = document.getElementById("f0");
var p2 = document.getElementById("f1");
var email = document.getElementById("email");
var button = document.getElementById("submitButton");
var con = document.getElementById("console");

button.addEventListener('click', function(){
    //if p1 and p2 dont match then repromt
    if(p1.value != p2.value){
        alert("Passwords do not match!");
        p1.value = p2.value = '';
    }
    else{
        var request = new XMLHttpRequest();

        request.onload = function() {
            var resp = JSON.parse(this.response);
            if (this.status >= 200 && this.status < 400 && this.readyState == 4) {
                // Success!
                con.innerHTML = "<p>Response: </p>" + "<p>" + resp.message + "</p>";
                console.log(resp);
            } else {
                // We reached our target server, but it returned an error like password incorrect
                con.innerHTML = "<p>Response: </p>" + "<p>" + resp.message + "</p>";
                console.log(resp);
            }
        };

        request.onerror = function(error) {
            // There was a connection error of some sort like server not found
            console.log("request error: " + error);
        };

        //open request
        request.open('POST', '/changepass', true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        //data to send
        var dataToSend = JSON.stringify({
            email: email.innerText,
            password: p1.value
        });
        //send it
        request.send(dataToSend);
    }
});