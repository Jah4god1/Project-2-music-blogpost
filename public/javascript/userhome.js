var homeLink = document.querySelector('.navbar-brand');
       homeLink.addEventListener('click', function(event) {
           event.preventDefault();
           alert('Home link clicked!');
           // Add your desired functionality here
       });

       // Event listener for the About link
       var aboutLink = document.querySelector('.nav-link[href="#"]');
       aboutLink.addEventListener('click', function(event) {
           event.preventDefault();
           alert('About link clicked!');
           // Add your desired functionality here
       });

       // Event listener for the Login link
       var loginLink = document.querySelector('.nav-link[href="C:/Users/Micci/Desktop/Project-2-music-blogpost/public/micciloginform.html"]');
       loginLink.addEventListener('click', function(event) {
           event.preventDefault();
           alert('Login link clicked!');
           // Add your desired functionality here
       });