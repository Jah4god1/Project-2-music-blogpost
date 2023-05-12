//TANNER
const express = require('express');
const { body } = require('express-validator');
const homeController = require('./controllers/homeController');
const apiController = require('./controllers/apiController');

const router = express.Router();

router.get('/', homeController.getIndex);

router.get('/api/songs', apiController.getSongs);

router.post('/api/songs', [
  body('title').notEmpty(),
  body('artist').notEmpty(),
  body('album').notEmpty(),
  body('year').isInt(),
], apiController.addSong);

module.exports = router;
