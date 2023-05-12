//TANNER
const apiController = require('../controllers/apiController');
const express = require('express');
const router = express.Router();
const songController = require('./songController');
const userRoutes = require('./api/user-routes');

// GET route to retrieve all songs
router.get('/songs', songController.getAllSongs);

// POST route to add a new song
router.post('/songs', songController.addNewSong);

// sets up a middleware for handling requests with a URL starting with 
//"/auth" and uses the routes defined in the userRoutes module
app.use('/auth', userRoutes);

module.exports = router;
