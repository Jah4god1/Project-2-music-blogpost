 // HANDLE form submission function
function handleSignup(event) {
    event.preventDefault(); 
  
    //GET form inputs by id (CHANGE to: usernameInput, emailInput, passwordInput)
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  //NEED TO CHANGE IN handlebars if all are ok with eliminating "fullName"
    
    // GET User input values (NEW addition)
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
  
    // VALIDATE inputs (USERNAME, EMAIL & PASSWORD)
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
  
    //User data object
    const userData = {
      username: username,
      email: email,
      password: password
    };
  
    // SEND data to server using fetch
    // UPDATE URL with server endpoint
    fetch('/signup', {
      method: 'POST',
      headers: {
        //RENAME accordingly
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      // SERVER RESPONSE
      if (response.ok) {

        // SUCCESSFUL sign up displays message & redirect
        alert('Signup successful!');
      
      } else {

        // HANDLE error if signup fails
        alert('Signup failed. Please try again.');
      }
    })
    .catch(error => {
        
      // HANDLE all errors
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  }
  
  // EVENT LISTENER (NEW addition)
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', handleSignup);
  




/*document.getElementById('signupForm').addEventListener('submit', function(event) {
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
*/

