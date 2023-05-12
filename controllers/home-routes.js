const express = require('express');
const router = express.Router();
const { Post, Response } = require('../models');
const { isAuthenticated } = require('../middleware/auth');
const { getConnection } = require('../helpers');

// Route to handle form submissions for the song forum
router.post('/responses', isAuthenticated, (req, res) => {
  const { postId, name, artist, album, feelings } = req.body;
  const { image } = req.files;

  // Check if all required fields are present
  if (!postId || !name || !artist || !album || !feelings || !image) {
    return res.status(400).send('All fields are required.');
  }

  getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).send('An error occurred while processing your request.');
    }

    const insertQuery = 'INSERT INTO responses (post_id, user_id, name, artist, album, feelings, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const userId = req.session.userId;

    // Save the response to the database
    connection.query(insertQuery, [postId, userId, name, artist, album, feelings, image.name], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error inserting response into database:', err);
        return res.status(500).send('An error occurred while processing your request.');
      }

      return res.redirect('/');
    });
  });
});

module.exports = router;
