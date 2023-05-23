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

    // Get the selected image
    var selectedImage = pictureSelect.value;

    // Clear the inputs
    songTitleInput.value = '';
    artistNameInput.value = '';

    // Display the posted content
    var postedContent = document.createElement('p');
    postedContent.textContent = 'Posted: ' + songTitle + ' by ' + artistName;
    pictureContainer.appendChild(postedContent);

    // Send the form data to the server
    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: songTitle,
        artist: artistName,
        image: selectedImage
      }),
    })
    .then(response => {
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // After the server responds, redirect to the user home page
      window.location.href = "../../views/userhome.handlebars";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});