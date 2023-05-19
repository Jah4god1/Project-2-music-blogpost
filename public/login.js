document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    var username = document.getElementById('inputUsername').value;
    var password = document.getElementById('inputPassword').value;
 fetch("/login",)
    // Perform form validation
    if (username === '' || password === '') {
        alert('Please enter a username and password');
        return;
    }

    // Perform further processing with the form data (e.g., send it to a server for authentication)
    // You can make an AJAX request or perform any desired action here

    // Reset the form
    document.getElementById('loginForm').reset();

    // Display a success message
    alert('Login successful!');
});





