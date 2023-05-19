document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get form input values
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;

    // Perform form validation
    if (username === "" || password === "") {
      alert("Please enter a username and password");
      return;
    }

    const response = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok){
        document.location.replace("/")
        
    }
    else {
        alert("login failed")
    }

    // Perform further processing with the form data (e.g., send it to a server for authentication)
    // You can make an AJAX request or perform any desired action here

    // Reset the form
    document.getElementById("loginForm").reset();

    // Display a success message
    alert("Login successful!");
  });
