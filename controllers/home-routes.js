const router = require('express').Router();

const { User } = require('../models/user');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');
const { Post } = require('../models/post');

// GET the homepage
router.get('/', async (req, res) => {
  try {
    if (req.session.logged_in) {

      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });
      
      const postData = await Post.findAll({
        order: [['createdAt', 'DESC']],
      });

      const users = userData.map((user) => user.get({ plain: true }));
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('userhome', {
        users,
        posts,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render('main');
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load homepage' });
  }
});

// REGISTER new user
router.post('/register', async (req, res) => {

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.session.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// HANDLE logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/'); // REDIRECT to the main page after logging out
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
