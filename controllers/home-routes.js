const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');
const { Post } = require('../models');

// Get the homepage
router.get('/', async (req, res) => {
  // If user is logged in, show homepage. If not, show login/register page.
  if (req.session.logged_in) {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });

      const users = userData.map((user) => user.get({ plain: true }));

      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.render('frontpage');
  }
});

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
  
      res.status(201).json(user);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) { 
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
  
      res.status(200).json({ message: 'Logged in successfully' });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Handle logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Create new post
router.post('/post', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = await Post.create({ 
      title, 
      content, 
      userId: req.session.user_id // assuming user's ID is stored in session
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

module.exports = router;
