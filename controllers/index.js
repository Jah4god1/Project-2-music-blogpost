const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

router.use('/', home-routes);
router.use('/api', apiRoutes);

module.exports = router;

const multer = require('multer');

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage });

// API endpoint for image upload
router.post('/images/upload', upload.single('image'), uploadImage);
