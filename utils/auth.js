const bcrypt = require('bcrypt');
const { validationResult, body } = require('express-validator');
const User = require('../models/user');
const db = require('../config/connection');

// Middleware to check if the user is authenticated
exports.authenticate = (req, res, next) => {
  if (req.session.userId) { // Check if the user ID is stored in the session
    return next(); // If the user is authenticated, call the next middleware function
  }

  res.redirect('/login'); // If the user is not authenticated, redirect to the login page
};

// Route handler for the login page
exports.login = (req, res) => {
  res.render('login', {
    pageTitle: 'Login',
  });
};

// Route handler for authenticating a user
exports.authenticateUser = [
  // Validate the email field
  body('email').isEmail(),

  // Validate the password field
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },

  // Authenticate the user
  (req, res) => {
    const { email, password } = req.body;

    // Find the user in the database with the given email
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' }); // If the user is not found, return an error in the response
        }

        // Compare the provided password with the password hash stored in the database using bcrypt
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) { // If the password is correct, store the user ID in the session and return a success message in the response
            req.session.userId = user.id;
            return res.json({ success: true });
          }

          return res.status(401).json({ error: 'Incorrect password' }); // If the password is incorrect, return an error in the response
        });
      })
      .catch((err) => { // If there is a server error, return an error in the response
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      });
  }
];

// Route handler for logging out a user
exports.logout = (req, res) => {
  req.session.destroy((err) => { // Destroy the session and redirect to the homepage
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
    res.redirect('/');
  });
};
