document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form input values
    var email = document.getElementById("inputEmail").value;
    var fullName = document.getElementById("inputFullName").value;
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;

    // Perform form validation
    if (email === "" || fullName === "" || username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
 
    // Create an object to hold the form data
    var formData = {
      email: email,
      fullName: fullName,
      username: username,
      password: password,
    };

    const response = await fetch("api/users/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json"}
    })
    
    if (response.ok){
        document.location.replace("/")

    }
    else {
        alert("signup failed")
    }
    // Perform further processing with the form data (e.g., send it to a server)
    // You can make an AJAX request or perform any desired action here

    // Reset the form
    document.getElementById("signupForm").reset();

    // Display a success message
    alert("Sign up successful!");
  });
