document.addEventListener('DOMContentLoaded', function() {
  // Select the picture container and the picture select element
  var pictureContainer = document.getElementById('pictureContainer');
  var pictureSelect = document.getElementById('pictureSelect');

  // Add event listener to the picture select element
  pictureSelect.addEventListener('change', function() {
    // Get the selected option value
    var selectedOption = pictureSelect.value;

    // Clear the picture container
    pictureContainer.innerHTML = '';

    // Create a new image element
    var image = document.createElement('img');
    image.src = selectedOption;
    image.classList.add('img-fluid');

    // Append the image to the picture container
    pictureContainer.appendChild(image);
  });

  // Add event listener to the post form
  var postForm = document.querySelector('.form-container form');
  postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the song title and artist/band name inputs
    var songTitleInput = document.getElementById('inputUsername');
    var artistNameInput = document.getElementById('inputPassword');

    // Get the values from the inputs
    var songTitle = songTitleInput.value;
    var artistName = artistNameInput.value;

    // Clear the inputs
    songTitleInput.value = '';
    artistNameInput.value = '';

    // Display the posted content
    var postedContent = document.createElement('p');
    postedContent.textContent = 'Posted: ' + songTitle + ' by ' + artistName;
    pictureContainer.appendChild(postedContent);
  });
});





// When the form is submitted
postForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the song title and artist/band name inputs
  var songTitleInput = document.getElementById('inputUsername');
  var artistNameInput = document.getElementById('inputPassword');

  // Get the values from the inputs
  var songTitle = songTitleInput.value;
  var artistName = artistNameInput.value;

  // Clear the inputs
  songTitleInput.value = '';
  artistNameInput.value = '';

  // Send the form data to the server
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: songTitle,
      artist: artistName,
    }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
});

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



