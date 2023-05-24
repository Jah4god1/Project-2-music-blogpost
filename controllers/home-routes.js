const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the main page
router.get('/', (req, res) => {
  res.render('main');
});

// Use withAuth middleware to prevent access to route
router.get('/userhome', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('userhome', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userhome');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/userhome');
    return;
  }

  res.render('signup');
});

module.exports = router;
