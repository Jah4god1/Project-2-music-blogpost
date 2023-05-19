const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
  try {
    const { songName, artist, feeling } = req.body;

    // Fetch picture from API based on the selected feeling
    const picture = await fetchPictureFromAPI(feeling);

    // Create the post with song name, artist, feeling, and picture
    const post = await Post.create({
      songName,
      artist,
      feeling,
      picture,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Function to fetch a picture from the API based on the selected feeling
async function fetchPictureFromAPI(feeling) {
  try {
    // Make an API call to fetch the picture based on the feeling
    const response = await axios.get(`API_URL/${feeling}`);
    const picture = response.data.picture;

    return picture;
  } catch (err) {
    console.error(err);
    return null; // Return null or a default picture in case of an error
  }
}

module.exports = router;