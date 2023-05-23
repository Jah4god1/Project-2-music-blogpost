// micci form 
document.querySelector("#signupForm").addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.querySelector("#inputEmail").value;
    var fullName = document.querySelector("#inputFullName").value;
    var username = document.querySelector("#inputUsername").value;
    var password = document.querySelector("#inputPassword").value;
  
    if(email === "" || fullName === "" || username === "" || password === "") {
        alert("All fields are required!");
    } else {
        alert("Form submitted successfully!");
        // Do we need to add code to send form data to your server?
  
        window.location.href = "./miccitestuserpost.html";
    }
  });



  