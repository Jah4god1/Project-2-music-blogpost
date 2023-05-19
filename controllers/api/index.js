//ADDED images-routes.js
const router = require('express').Router();
const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const postRoutes = require('./post-routes');
const imageRoutes = require('./images-routes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/posts', postRoutes);
router.use('/images', imagesRoutes);

module.exports = router;
