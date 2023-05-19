document.getElementById('pictureSelect').addEventListener('change', function() {
    var pictureContainer = document.getElementById('pictureContainer');
  
    // Clear the container
    pictureContainer.innerHTML = '';
  
    // Choose the image source based on the select value
   
    var imgSrc = this.value;

    // Create a new image element and add it to the container
    if (imgSrc) {

      var img = document.createElement('img');
      img.src = imgSrc;
      img.classList.add('picture-image');
      pictureContainer.appendChild(img);
      img.setAttribute('width', 250);
      //pictureContainer.style.backgroundImage=`url(${imgSrc})`;
    }
  });