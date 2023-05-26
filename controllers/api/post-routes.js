const router = require('express').Router();
const { Post } = require('../../models');


// Create a new post
router.post('/create', async (req, res) => {
  try {
    const { songName, artist, } = req.body;
    const userId = req.session.user_id; // assuming user's ID is stored in session

    // Create the post with song name, artist, and userId
    const post = await Post.create({
      userId,
      songName,
      artist,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});


// CREATE a new post
router.post('/post', async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({ 
      title, 
      content, 
      userId: req.session.user_id // 
    });

    res.redirect('/'); // REDIRECT to homepage
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});


module.exports = router;

