// micci form 
document.querySelector("#signupForm").addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.querySelector("#inputEmail").value;
    var username = document.querySelector("#inputUsername").value;
    var password = document.querySelector("#inputPassword").value;
  
    if(email === ""  || username === "" || password === "") {
        console.log('this info is required')
    }
  });



  