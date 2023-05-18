const router = require('express').Router();
const userRoutes = require('./user-routes');
const songRoutes = require('./song-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/songs', songRoutes);
router.use('/posts', postRoutes);

module.exports = router;