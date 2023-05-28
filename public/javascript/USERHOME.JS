//ONLY LOADS USER POSTS, NEED TO LOAD ALL USERS POSTS, AS WELL
// When the "USERHOME" page loads
window.addEventListener('DOMContentLoaded', (event) => {
  // Send a request to the server for all posts
  fetch('/posts')
    .then(response => response.json())
    .then(posts => {
      // Loop through each post and create an HTML element for it
      posts.forEach(post => {
        // Create a new paragraph element
        var postElement = document.createElement('p');

        // Set the text content of the paragraph
        postElement.textContent = post.title + ' by ' + post.artist;

        // Append the paragraph to the body of the page
        document.body.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});
