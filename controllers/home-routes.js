const express = require('express');
const router = require('express').Router();
const { Post, User, Response } = require('../models');
const { isAuthenticated } = require('../utils/auth');
const { getConnection } = require('../utils/helpers');

// Route to handle form submissions for the song forum
router.post('/responses', isAuthenticated, async (req, res) => {
  const { postId, name, artist, album, feelings } = req.body;
  const { image } = req.files;

  // Check if all required fields are present
  if (!postId || !name || !artist || !album || !feelings || !image) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).send('Post not found.');
    }

    const user = await User.findByPk(req.session.userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const response = await Response.create({
      postId: post.id,
      userId: user.id,
      name,
      artist,
      album,
      feelings,
      image: image.name
    });

    return res.redirect('/');
  } catch (err) {
    console.error('Error inserting response into database:', err);
    return res.status(500).send('An error occurred while processing your request.');
  }
});

module.exports = router;
