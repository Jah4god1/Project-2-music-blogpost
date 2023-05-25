const router = require('express').Router();
const { User } = require('../../models');


router.post('/signup', async (req, res) => {
  try {
    console.log('i made it ')
    // Create a new user with the data from req.body
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,  // in a real-world application, be sure to hash this password
    });

    // Save the user's ID and logged-in status to the session
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Send a success status code
      res.status(200).json(newUser);
    });

    // Redirect the user to the /userhome page
    // res.redirect('/userhome');
  } catch (err) {
    // If there's an error, send it back to the client
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log('i am here')

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
