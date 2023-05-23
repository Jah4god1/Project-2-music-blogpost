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
  })
  
    // Add event listener to the post fo