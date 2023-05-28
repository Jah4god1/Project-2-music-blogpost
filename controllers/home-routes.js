const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the main page
router.get('/', (req, res) => {
  console.log('i made it to this route')
  res.render('frontpage');
});

// Use withAuth middleware to prevent access to route
router.get('/userhome', withAuth, async (req, res) => {
  // router.get('/userhome', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('userhome', {
      ...user,
      // style: "userhome.css",
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


router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('post', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;