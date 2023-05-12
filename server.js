//TANNER
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const { sessionSecret } = require('./config/auth');

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

// Set up the routes
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
