// IMPORT required libraries
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

// .ENV variables
dotenv.config();

// CREATE instance
const app = express();

// VIEW for Handlebars.js
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// MySQL database (Sequelize ORM)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  },
});
module.exports = sequelize;

// TEST connection to the database
sequelize.authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// SET UP auth. (express-session and cookies)
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Export the app
module.exports = app;
