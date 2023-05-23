//bcrypt dependency located in models/user.js 
//CHECK paths
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const { hashPassword, checkPassword } = require('./auth');//ADDED

// MIDDLEWARE- authenticate user (NEW)
const authenticateUser = (req, res, next) => {
  if (req.session.logged_in) {
    // USER logged in, proceed
    next();
  } else {
    // USER NOT logged in, send error
    res.status(401).json({ error: 'Unauthorized' });
  }
};

//CREATE REGISTRATION
router.post('/', async(req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    // CREATE NEW
    const userData = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//LOGIN endpoint (find User)
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({where: {email: req.body.email} });

    if (!userData) {
      res
        .status(400)
        .json ({ message: 'Incorrect email or password, please try again'});
        return;
    }
//COMPARES hashed password against stored password
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or passwork, please try again'});
      return;
    }

//UPDATE
    req.session.save(() =>  {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json ({ user: userData, message: 'You are now logged in!'});
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOGOUT- Requires authentication (NEW)
router.post('/logout', authenticateUser,(req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE user account - Requires authentication
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user by their ID
    await User.destroy({ where: { id } });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// DELETE a user's post - Requires authentication
router.delete('/posts/:postId', authenticateUser, async (req, res) => {
  try {
    const { postId } = req.params;

    // DELETE post by its ID
    await Post.destroy({ where: { id: postId } });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;