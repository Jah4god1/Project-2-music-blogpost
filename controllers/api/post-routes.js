const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/posts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'], // replace 'username' with the actual username attribute in your User model
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

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

router.delete('/:id',  async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

