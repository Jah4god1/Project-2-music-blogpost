document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form input values
    var email = document.getElementById('inputEmail').value;
    var fullName = document.getElementById('inputFullName').value;
    var username = document.getElementById('inputUsername').value;
    var password = document.getElementById('inputPassword').value;

    // Perform form validation
    if (email === '' || fullName === '' || username === '' || password === '') {
        alert('Please fill in all fields');
        return;
    }

    // Create an object to hold the form data
    var formData = {
        email: email,
        fullName: fullName,
        username: username,
        password: password
    };

    // Send the form data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        // Handle the response from the server
        console.log(data);
        // Reset the form
        document.getElementById('signupForm').reset();
        // Display a success message
        alert('Sign up successful!');
    }).catch((error) => {
        console.error('Error:', error);
    });
});






