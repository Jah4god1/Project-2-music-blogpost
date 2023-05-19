const express = require('express');
const router = express.Router();
const { Song } = require('../../models');

// Create a new song
router.post('/', async (req, res) => {
    try {
      const { title, artist, feeling } = req.body;

      const song = await Song.create({ title, artist, feeling });

      res.status(201).json(song);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create song' });
    }
  });

  // Get a specific song by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const song = await Song.findByPk(id);

      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }

      res.status(200).json(song);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve song' });
    }
  });

  // Delete a song
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const song = await Song.findByPk(id);

      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }

      await song.destroy();

      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete song' });
    }
  });

  module.exports = router;