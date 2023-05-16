// IMPORT required libraries
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

//.ENV variables
dotenv.config();

// CREATE instance
const app = express();

// VIEW for Handlebars.js
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// MySQL database (Sequelize ORM)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// TEST connection to the database
sequelize.authenticate()
  .then(() => console.log('Database connection successful.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// SET UP auth. (express-session and cookies)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());

// START server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
