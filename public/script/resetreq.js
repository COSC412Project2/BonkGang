//script to send request to server and handle response
var formEmail = document.getElementById('f0');
var con = document.getElementById("console");

//event listener for submit button click
document.getElementById('submitButton').addEventListener('click', function() {
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
    request.open('POST', '/resetrequest', true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    //data to send
    var dataToSend = JSON.stringify({
        email: formEmail.value,
    });
    //send it
    request.send(dataToSend);
});