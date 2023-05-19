logoutButton.addEventListener('click', async function() {
    try {
      // Send a POST request to the '/logout' route
      const logoutResponse = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const userResponse = await fetch("api/users/", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      // If the request was successful, reload the page
      if (logoutResponse.ok && userResponse.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    } catch (err) {
      console.error(err);
    }
  });
  