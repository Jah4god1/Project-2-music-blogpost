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

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});