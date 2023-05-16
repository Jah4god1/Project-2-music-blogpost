const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const authRoutes = require('./utils/auth');
const homeRoutes = require('./controllers/home-routes');
const { sessionSecret } = require('./utils/helpers');
const multer = require('multer');

const app = express();

// Set up the session middleware
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// Set up middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Set up the view engine
app.set('view engine', 'ejs');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// Set up the routes
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

// Handle the form submission for posting a response
app.post('/post-response/:postId', upload.single('response-image'), (req, res) => {
  const postId = req.params.postId;
  const responseText = req.body.responseText;
  const songName = req.body.songName;
  const artistName = req.body.artistName;
  const albumName = req.body.albumName;
  const feeling = req.body.feeling;
  const userId = req.session.userId;
  const imageFileName = req.file ? req.file.filename : null;

  // Insert the response into the database
  const sql = `
    INSERT INTO responses (post_id, user_id, response_text, song_name, artist_name, album_name, feeling, image_filename)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [postId, userId, responseText, songName, artistName, albumName, feeling, imageFileName];
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return res.status(500).send('Internal server error');
    }
    connection.query(sql, values, (err, result) => {
      connection.release();
      if (err) {
        console.error('Error inserting response into database:', err);
        return res.status(500).send('Internal server error');
      }
      res.redirect(`/post/${postId}`);
    });
  });
});

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});