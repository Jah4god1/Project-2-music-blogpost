// POST FORM TEMPLATE
function updateImage() {
  var pictureSelect = document.getElementById("pictureSelect");
  var selectedValue = pictureSelect.value;

  // image array with corresponding sources
  var imageArray = {
    Love: "public/images/uploads/love.webp",
    Workout: "public/images/uploads/workout.jpg",
    Study: "public/images/uploads/study.webp",
    Dance: "public/images/uploads/dance.webp"
  };

  // GET selected image source from the image array
  var imageSrc = imageArray[selectedValue];

  // var imageElement = document.getElementById("postImage");
  imageElement.src = imageSrc;
}

// WAIT for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {

  // GET form element
  var postForm = document.querySelector(".post-form");

  // ADD event listener for form submission
  postForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // GET form values
    var pictureSelect = document.getElementById("pictureSelect");
    var songNameInput = document.getElementById("inputSongName");
    var artistInput = document.getElementById("inputArtist");

    // CREATE a new post object
    var post = {
      picture: pictureSelect.value,
      songName: songNameInput.value,
      artist: artistInput.value
    };

    try {
      // CALL async function to send the POST request and render the new post
      await createPost(post);
    } catch (error) {
      // HANDLE errors that occur during the request
      console.error('Error:', error);
    }

    // RESET form values
    pictureSelect.value = "";
    songNameInput.value = "";
    artistInput.value = "";
  });

  // ASYNC function to send the POST request and render the new post
  async function createPost(post) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // CALL function to render the new post on the page
      renderPost(post);
    } else {
      throw new Error(response.statusText);
    }
  }

  // FUNCTION to render a new post on the page
  function renderPost(post) {

    // GET post list element
    var postList = document.querySelector(".post-list");

    // CREATE new list item element
    var listItem = document.createElement("li");

    // SET inner HTML of the list item using the post data
    listItem.innerHTML = `
      <div class="post-info">
        <img src="public/images/uploads/${post.picture}.webp" alt="${post.picture}">
        <p>Song Title: ${post.songName}</p>
        <p>Artist/Band Name: ${post.artist}</p>
      </div>
    `;

    // APPEND new list item to the post list
    postList.appendChild(listItem);
  }
});
