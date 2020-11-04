$(document).ready(function() {
  $("#submit").click(function() {
    var name = $("#name").val();
    var phone = $("#num").val();
    var DOB = $("#DOB").val();
    // console.log("name", name, "phone", phone, "dob", DOB);
    if (name == "") {
      alert("Please Fill All Fields");
    } else {
      var firbase = firebase.creaclient();
      var settings = {
        url: "http://localhost:8080/employes",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify({ name: name, phone: phone, birth: DOB })
      };
      $.ajax(settings)
      .done(function(response) {
        document.getElementById("maincontent").innerHTML = `<div>${response}</div>`;
        // console.log(response);
        return true;
      });
    }
    
  });
  $("#register").click(function() {
    var name = $("#name").val();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log("name: ", name, " username:", username," password: ",password);

    if (name == "" || username=="" || password=="") {
      alert("Please Fill All Fields");
    } else {
      var settings = {
        url: "http://localhost:8080/register",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify({ name: name, username: username, password: password })
      };
        $.ajax(settings)
      .done(function(response) {
        window.location.href = "/login.html";
        return true;
      });
    }
  });
  $("#login").click(function() {
    //var name = $("#name").val();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log("login username:", username,"password:",password);
    if (username=="" || password=="") {
      alert("Please Fill All Fields");
    } else {
      var settings = {
        url: "http://localhost:8080/login",
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        data: JSON.stringify({ username: username, password: password})
      };
      $.ajax(settings)
      .done(function(response) {
         if(!response.status){
          window.location.href = "/succes.html";
         }
        return true;
      });
    }
  });
});
