//TANNER
const apiController = require('../controllers/apiController');
const express = require('express');
const router = express.Router();
const songController = require('./songController');

// GET route to retrieve all songs
router.get('/songs', songController.getAllSongs);

// POST route to add a new song
router.post('/songs', songController.addNewSong);

module.exports = router;
