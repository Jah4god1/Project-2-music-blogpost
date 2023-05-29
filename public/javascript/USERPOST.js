function updateImage() {
  var pictureSelect = document.getElementById("pictureSelect");
  var selectedValue = pictureSelect.value;

  // Define an image array with corresponding sources
  var imageArray = {
    Love: "public/images/uploads/love.webp",
    Workout: "public/images/uploads/workout.jpg",
    Study: "public/images/uploads/study.webp",
    Dance: "public/images/uploads/dance.webp"
  };

  // Get the selected image source from the image array
  var imageSrc = imageArray[selectedValue];

  var imageElement = document.getElementById("postImage");
  imageElement.src = imageSrc;
}

// Additional JavaScript code for handling form submission or other functionality can be added here

// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  var postForm = document.querySelector(".post-form");

  // Add an event listener for form submission
  postForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    var pictureSelect = document.getElementById("pictureSelect");
    var songNameInput = document.getElementById("inputSongName");
    var artistInput = document.getElementById("inputArtist");

    // Create a new post object
    var post = {
      picture: pictureSelect.value,
      songName: songNameInput.value,
      artist: artistInput.value
    };

    // Call a function to render the new post on the page
    renderPost(post);

    // Reset the form values
    pictureSelect.value = "";
    songNameInput.value = "";
    artistInput.value = "";
  });

  // Function to render a new post on the page
  function renderPost(post) {
    // Get the post list element
    var postList = document.querySelector(".post-list");

    // Create a new list item element
    var listItem = document.createElement("li");

    // Set the inner HTML of the list item using the post data
    listItem.innerHTML = `
      <div class="post-info">
        <img src="public/images/uploads/${post.picture}.webp" alt="${post.picture}">
        <p>Song Title: ${post.songName}</p>
        <p>Artist/Band Name: ${post.artist}</p>
      </div>
    `;

    // Append the new list item to the post list
    postList.appendChild(listItem);
  }
});














/*// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  var postForm = document.querySelector(".post-form");

  // Add an event listener for form submission
  postForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form values
    var pictureSelect = document.getElementById("pictureSelect");
    var songNameInput = document.getElementById("inputSongName");
    var artistInput = document.getElementById("inputArtist");

    // Create a new post object
    var post = {
      picture: pictureSelect.value,
      songName: songNameInput.value,
      artist: artistInput.value
    };

    // Call a function to render the new post on the page
    renderPost(post);

    // Reset the form values
    pictureSelect.value = "";
    songNameInput.value = "";
    artistInput.value = "";
  });

  // Function to render a new post on the page
  function renderPost(post) {
    // Get the post list element
    var postList = document.querySelector(".post-list");

    // Create a new list item element
    var listItem = document.createElement("li");

    // Set the inner HTML of the list item using the post data
    listItem.innerHTML = `
      <div class="post-info">
        <img src="public/images/uploads/${post.picture}.webp" alt="${post.picture}">
        <p>Song Title: ${post.songName}</p>
        <p>Artist/Band Name: ${post.artist}</p>
      </div>
    `;

    // Append the new list item to the post list
    postList.appendChild(listItem);
  }
});
*/