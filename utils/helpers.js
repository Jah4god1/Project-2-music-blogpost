//ADDED helper.js new & EXAMPLE for HANDLEBARS MAIN
//IMPORT Handlebars 
const Handlebars = require('handlebars');

// DEFINE image options array
const imageOptions = [
  { value: "loveImage", label: "Love Image" },
  { value: "relaxImage", label: "Relax Image" },
  { value: "workoutImage", label: "Workout Image" },
  { value: "studyImage", label: "Study Image" },
  { value: "danceImage", label: "Dance Image" }
];

// FORM submission function
function submitForm() {
  // GET selected image from the dropdown
  const selectedImage = document.getElementById("imageDropdown").value;

  // GET song input details
  const songName = document.getElementById("songName").value;
  const albumName = document.getElementById("albumName").value;
  const artistName = document.getElementById("artistName").value;
  const caption = document.getElementById("caption").value;

  // DISPLAY selected image and added text input
  console.log("Selected Image: " + selectedImage);
  console.log("Song Name: " + songName);
  console.log("Album Name: " + albumName);
  console.log("Artist Name: " + artistName);
  console.log("Caption: " + caption);

  // CLEAR form fields
  document.getElementById("songForm").reset();
}

// REGISTER Handlebars helper util form submission
Handlebars.registerHelper('submitFormHelper', function() {
  // Create a string with the JavaScript code for the form submission
  const submitFunction = "submitForm()";

  // RETURN string as HTML with Handlebars.SafeString
  return new Handlebars.SafeString(submitFunction);
});

// EXPORT submitForm function & imageOptions array
module.exports = {
  submitForm: submitForm,
  imageOptions: imageOptions
};