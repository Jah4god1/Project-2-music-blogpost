function getImage(selection) {
    // DEFINE the base URL or file path to your image folder
    const imageFolder = 'path/to/your/image/folder/';
  
    // DEFINE a mapping between the user's selection and the image filenames
    const imageMap = {
      option1: 'image1.jpg',
      option2: 'image2.jpg',
      option3: 'image3.jpg',
      // Add more options as needed
    };
  
    // CHECK if the selection exists in the image map
    if (selection in imageMap) {
      // RETURN the complete URL or file path to the selected image
      return imageFolder + imageMap[selection];
    }
  
    // IF not found, return null or an appropriate default value
    return null;
  }
  
  /*
  // Prompt the user for their selection
const userSelection = prompt('Please select an option: option1, option2, or option3');

// Call the getImage() function to retrieve the image URL or file path
const imageURL = getImage(userSelection);

// Use the imageURL as needed, for example, displaying it in an <img> element
if (imageURL) {
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  document.body.appendChild(imgElement);
} else {
  console.log('Invalid selection');
}
*/