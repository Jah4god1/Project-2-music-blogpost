const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Delete user account
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user by their ID
    await User.destroy({ where: { id } });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Delete a user's post
router.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    // Delete the post by its ID
    await Post.destroy({ where: { id: postId } });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;