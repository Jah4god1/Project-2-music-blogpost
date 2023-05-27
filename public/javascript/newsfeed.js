document.addEventListener('DOMContentLoaded', function () {
    // Select the necessary HTML elements
    var postForm = document.querySelector('.form-container form');
    var postList = document.querySelector('.post-list');
  
    // Add event listener to the post form
    postForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get the song title and artist/band name inputs
      var songTitleInput = document.getElementById('inputSongName');
      var artistNameInput = document.getElementById('inputArtist');
  
      // Get the values from the inputs
      var songTitle = songTitleInput.value;
      var artistName = artistNameInput.value;
  
      // Clear the inputs
      songTitleInput.value = '';
      artistNameInput.value = '';
  
      // Create a new list item for the post
      var postItem = document.createElement('li');
      postItem.textContent = 'Posted: ' + songTitle + ' by ' + artistName;
  
      // Append the new post to the post list
      postList.appendChild(postItem);
    });
  });
  