//TANNER
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Route handler for the login page
router.get('/login', (req, res) => {
  res.render('login', {
    pageTitle: 'Login',
  });
});

// Route handler for authenticating a user
router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
], async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('login', {
      pageTitle: 'Login',
      errors: errors.array(),
      email,
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).render('login', {
        pageTitle: 'Login',
        error: 'Invalid email or password.',
        email,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).render('login', {
        pageTitle: 'Login',
        error: 'Invalid email or password.',
        email,
      });
    }

    req.session.userId = user.id;
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).render('login', {
      pageTitle: 'Login',
      error: 'An unexpected error occurred. Please try again later.',
      email,
    });
  }
});

// Route handler for logging out a user
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
